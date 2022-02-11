import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useEventListener from "@use-it/event-listener";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import BackIcon from "../../icons/BackIcon";
import EditIcon from "../../icons/EditIcon";
import FavouriteSolidIcon from "../../icons/FavouriteSolidIcon";
import FavouriteOutlineIcon from "../../icons/FavouriteOutlineIcon";
import NextWithBorderIcon from "../../icons/NextWithBorderIcon";
import PreviousWithBorderIcon from "../../icons/PreviousWithBorderIcon";
import FlipIcon from "../../icons/FlipIcon";

const ViewSetPage = () => {
    const router = useRouter();
    const setId = router.query.id;
    const apiUrl = setId ? `/api/sets/${setId}` : null;

    const [data, error] = useFetch(apiUrl);
    const [isFavourite, setIsFavourite] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentViewState, setCurrentViewState] = useState(false);

    const { t } = useTranslation(["sets", "common"]);

    // set isFavourite initial state
    useEffect(() => {
        if (data) {
            setIsFavourite(data.isFavourite);
        }
    }, [data]);

    const changeCurrentCardHandler = (action) => {
        setCurrentViewState(false);
        if (action === "next") {
            setCurrentCardIndex((prevState) => {
                if (prevState + 1 > data.cards.length - 1) {
                    return 0;
                }
                return prevState + 1;
            });
        } else if (action === "prev") {
            setCurrentCardIndex((prevState) => {
                if (prevState - 1 < 0) {
                    return data.cards.length - 1;
                }
                return prevState - 1;
            });
        }
    };

    const flipCardHandler = () => {
        setCurrentViewState((prevState) => !prevState);
    };

    const toggleFavouriteHandler = async () => {
        const res = await fetch(apiUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFavourite: !isFavourite }),
        });
        const resJson = await res.json();

        if (!resJson.errors) {
            setIsFavourite(resJson.isFavourite);
        }
    };

    useEventListener("keydown", ({ keyCode }) => {
        // Left Arrow = 37, Right Arrow = 39, Spacebar = 32
        if (keyCode === 37) {
            changeCurrentCardHandler("prev");
        } else if (keyCode === 39) {
            changeCurrentCardHandler("next");
        } else if (keyCode === 32) {
            flipCardHandler();
        }
    });

    if (!data) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <RequireAuth>
                <ErrorDialog msg={error} />
            </RequireAuth>
        );
    }

    let setView;
    if (data.cards.length > 0) {
        setView = (
            <div className="select-none">
                <div className="mt-4 text-center text-lg font-bold text-gray-600">
                    <p>
                        {`${t("card_of_1")} ${currentCardIndex + 1} ${t(
                            "card_of_2"
                        )} ${data.cards.length}`}
                    </p>
                </div>
                <div className="flex items-center justify-around">
                    <div className="hidden w-1/4 justify-end md:flex">
                        <PreviousWithBorderIcon
                            className="mr-4 h-9 w-9 cursor-pointer"
                            onClick={() => {
                                changeCurrentCardHandler("prev");
                            }}
                        />
                    </div>
                    <div
                        className="flex w-full cursor-pointer justify-center lg:w-1/2"
                        onClick={flipCardHandler}
                    >
                        <div
                            className={[
                                "mt-4 flex w-96 items-center justify-center rounded-xl",
                                !currentViewState
                                    ? "bg-green-100"
                                    : "bg-yellow-100",
                            ].join(" ")}
                            style={{ minHeight: "300px" }}
                        >
                            <p className="p-6 text-center text-xl font-semibold text-gray-600">
                                {!currentViewState
                                    ? data.cards[currentCardIndex].front
                                    : data.cards[currentCardIndex].back}
                            </p>
                        </div>
                    </div>
                    <div className="hidden w-1/4 justify-start md:flex">
                        <NextWithBorderIcon
                            className="ml-4 h-9 w-9 cursor-pointer"
                            onClick={() => {
                                changeCurrentCardHandler("next");
                            }}
                        />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center font-semibold text-gray-600">
                    <div
                        className="flex cursor-pointer pr-10 md:hidden"
                        onClick={() => {
                            changeCurrentCardHandler("prev");
                        }}
                    >
                        <PreviousWithBorderIcon className="h-6 w-6" />
                    </div>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={flipCardHandler}
                    >
                        {t("flip")}
                        <FlipIcon className="ml-2 h-5 w-5" />
                    </div>
                    <div
                        className="flex cursor-pointer pl-10 md:hidden"
                        onClick={() => {
                            changeCurrentCardHandler("next");
                        }}
                    >
                        <NextWithBorderIcon className="h-6 w-6" />
                    </div>
                </div>
                <div className="mt-8 select-text text-center text-gray-600">
                    <p>
                        {t("flip_desc_1")}
                        <br />
                        <span className="hidden xl:block">
                            {t("flip_desc_2")}
                        </span>
                    </p>
                </div>
            </div>
        );
    } else {
        setView = (
            <div className="mt-6 flex select-text justify-center">
                <p className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-3 py-3 text-red-600 lg:w-1/2">
                    <span className="mr-2 font-bold">
                        {t("no_card_in_set")}
                    </span>
                </p>
            </div>
        );
    }

    return (
        <RequireAuth>
            <div className="mx-auto mt-8 w-5/6 lg:w-2/3 ">
                <div className="flex justify-between">
                    <Link href="/sets">
                        <span className="flex cursor-pointer items-center text-gray-600">
                            <BackIcon className="mr-1 h-4 w-4" />
                            {t("back_to_my_sets")}
                        </span>
                    </Link>
                    <Link href={`/sets/${setId}/edit`}>
                        <span className="flex cursor-pointer items-center text-green-600">
                            {t("common:edit")}
                            <EditIcon className="ml-2 h-4 w-4" />
                        </span>
                    </Link>
                </div>

                <div className="mt-4 select-text">
                    <div className="flex items-center justify-between">
                        <p className="mt-6 text-2xl font-bold text-green-600">
                            {data.name}
                        </p>
                        {isFavourite ? (
                            <p
                                className="flex cursor-pointer select-none text-yellow-500"
                                onClick={() => {
                                    toggleFavouriteHandler();
                                }}
                            >
                                <FavouriteSolidIcon className="mr-1 h-6 w-6" />
                                <span>{t("favourite")}</span>
                            </p>
                        ) : (
                            <p
                                className="flex cursor-pointer select-none text-gray-500"
                                onClick={() => {
                                    toggleFavouriteHandler();
                                }}
                            >
                                <FavouriteOutlineIcon className="mr-1 h-6 w-6" />
                                <span>{t("not_favourite")}</span>
                            </p>
                        )}
                    </div>
                    <p className="mt-2 font-semibold text-gray-600">
                        {data.description}
                    </p>
                </div>

                {setView}
            </div>
        </RequireAuth>
    );
};

export default ViewSetPage;
