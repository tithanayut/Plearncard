import { useState, useRef } from "react";
import { useRouter } from "next/router";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";

const CreateSetPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const topicField = useRef();
    const descriptionField = useRef();

    const { t } = useTranslation(["sets", "common"]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const createSetHandler = async (e) => {
        e.preventDefault();
        if (loading) {
            return;
        }

        setLoading(true);
        if (!topicField.current.value) {
            setError(t("incomplete_topic_field"));
            setLoading(false);
            return;
        }

        const res = await fetch("/api/sets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: topicField.current.value,
                description: descriptionField.current.value,
            }),
        });
        const resJson = await res.json();

        if (resJson.errors) {
            setError(resJson.errors.join(", "));
            setLoading(false);
            return;
        }
        router.push("/sets");
    };

    let errorDialog;
    if (error) {
        errorDialog = <ErrorDialog msg={error} />;
    }

    return (
        <RequireAuth>
            <div className="mx-auto mt-8 w-5/6 lg:w-2/3 ">
                <p className="text-2xl font-bold text-green-600">
                    {t("create_new_set")}
                </p>
                {errorDialog}
                <form
                    className="mt-6 text-gray-600"
                    onSubmit={createSetHandler}
                >
                    <div className="my-2">
                        <label className="font-bold" htmlFor="topic">
                            {t("topic")}
                        </label>
                        <input
                            className="outline-none h-8 w-full border-b-2 border-gray-400 lg:mx-3 lg:w-96"
                            type="text"
                            id="topic"
                            ref={topicField}
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="font-bold" htmlFor="description">
                            {t("description")}
                        </label>
                        <input
                            className="outline-none h-8 w-full border-b-2 border-gray-400 lg:mx-3 lg:w-2/3"
                            type="text"
                            id="description"
                            ref={descriptionField}
                        ></input>
                    </div>
                    <div className="mt-6">
                        <input
                            className="h-10 w-full cursor-pointer rounded-md bg-green-200 px-4 font-bold text-gray-600 hover:bg-green-300 hover:shadow-sm lg:w-auto"
                            type="submit"
                            value={t("common:create")}
                        />
                    </div>
                </form>
            </div>
        </RequireAuth>
    );
};

export default CreateSetPage;
