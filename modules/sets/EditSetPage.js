import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cuid from "cuid";
import RequireAuth from "../../helpers/auth/RequireAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import CardInputs from "../../components/CardInputs/CardInputs";
import BackIcon from "../../icons/BackIcon";
import SaveIcon from "../../icons/SaveIcon";
import PlusIcon from "../../icons/PlusIcon";
import TrashIcon from "../../icons/TrashIcon";

const EditSetPage = () => {
    const router = useRouter();
    const setId = router.query.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initData, setInitData] = useState(null);
    const [cards, setCards] = useState([]);

    const topicField = useRef();
    const descriptionField = useRef();

    const { t } = useTranslation(["sets", "common"]);

    const loadInitialSet = useCallback(async () => {
        if (!setId) {
            return;
        }

        const res = await fetch("/api/sets/" + setId);
        const data = await res.json();

        if (data.errors) {
            setError(data.errors.join(", "));
            return;
        }

        const initCards = [];
        data.cards.forEach((card) => {
            initCards.push({ id: cuid(), front: card.front, back: card.back });
        });
        setCards(initCards);

        setInitData(data);
        setLoading(false);
    }, [setInitData, setError, setId]);
    useEffect(loadInitialSet, [loadInitialSet]);

    const cardChangeHandler = (id, values) => {
        const newCards = cards.slice();
        cards.forEach((card) => {
            if (card.id === id) {
                if (values.front) {
                    card.front = values.front;
                }
                if (values.back) {
                    card.back = values.back;
                }
            }
        });
        setCards(newCards);
    };

    const addCardHandler = () => {
        const newCards = cards.slice();
        newCards.push({ id: cuid(), front: "", back: "" });
        setCards(newCards);
    };

    const deleteCardHandler = (id) => {
        const newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
    };

    const deleteSetHandler = async () => {
        setLoading(true);

        const res = await fetch("/api/sets/" + setId, {
            method: "DELETE",
        });
        const data = await res.json();
        if (data.errors) {
            setError(data.errors.join(", "));
            setLoading(false);
            return;
        }

        router.replace("/sets");
    };

    const saveToDBHandler = async () => {
        setLoading(true);

        const body = {
            id: setId,
            topic: topicField.current.value,
            description: descriptionField.current.value,
            total: cards.length,
            cards,
        };
        const res = await fetch("/api/sets/" + setId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.errors) {
            setError(data.errors.join(", "));
            setLoading(false);
            return;
        }

        router.push("/sets/" + setId);
    };

    if (loading && !error) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <RequireAuth>
                <ErrorDialog msg={error} />
            </RequireAuth>
        );
    }

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
                <div className="flex justify-between">
                    <Link href={"/sets/" + setId}>
                        <span className="flex items-center text-gray-600 cursor-pointer">
                            <BackIcon className="w-4 h-4 mr-1" />
                            {t("common:back")}
                        </span>
                    </Link>
                    <div
                        className="flex items-center text-red-600 cursor-pointer"
                        onClick={deleteSetHandler}
                    >
                        {t("common:delete")}
                        <TrashIcon className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </div>
            <div className="w-5/6 lg:w-2/3 mx-auto ">
                <form className="mt-6 text-gray-600">
                    <div className="my-2">
                        <label className="font-bold" htmlFor="topic">
                            {t("topic")}
                        </label>
                        <input
                            className="w-full lg:w-96 h-8 lg:mx-3 border-b-2 outline-none border-gray-400"
                            type="text"
                            id="topic"
                            defaultValue={initData.name}
                            ref={topicField}
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="font-bold" htmlFor="description">
                            {t("description")}
                        </label>
                        <input
                            className="w-full lg:w-2/3 h-8 lg:mx-3 border-b-2 outline-none border-gray-400"
                            type="text"
                            id="description"
                            defaultValue={initData.description}
                            ref={descriptionField}
                        ></input>
                    </div>
                </form>
                <div className="mt-8 text-lg text-center text-gray-600 font-bold">
                    <p>{t("cards_list")}</p>
                </div>
                <div className="flex justify-center mt-2">
                    <span
                        className="flex justify-center items-center px-4 h-9 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
                        onClick={addCardHandler}
                    >
                        {t("add_card")}
                        <PlusIcon class="w-6 h-6" />
                    </span>
                </div>
                <div className="flex justify-center mt-4">
                    <CardInputs
                        cards={cards}
                        change={cardChangeHandler}
                        delete={deleteCardHandler}
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <div
                        className="flex justify-center items-center px-4 h-10 font-bold bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
                        onClick={saveToDBHandler}
                    >
                        {t("common:save")}
                        <SaveIcon class="w-6 h-6 ml-2" />
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};

export default EditSetPage;
