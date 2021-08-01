import { useState, useRef } from "react";
import { useRouter } from "next/router";
import RequireAuth from "../../helpers/auth/RequireAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";

const SetsCreatePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const topicField = useRef();
    const descriptionField = useRef();

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
            setError("Please complete topic field");
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
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
                <p className="text-2xl text-green-600 font-bold">
                    Create new set
                </p>
                {errorDialog}
                <form
                    className="mt-6 text-gray-600"
                    onSubmit={createSetHandler}
                >
                    <div className="my-2">
                        <label className="font-bold" htmlFor="topic">
                            Topic
                        </label>
                        <input
                            className="w-full lg:w-96 h-8 lg:mx-3 border-b-2 outline-none border-gray-400"
                            type="text"
                            id="topic"
                            ref={topicField}
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="font-bold" htmlFor="description">
                            Description
                        </label>
                        <input
                            className="w-full lg:w-2/3 h-8 lg:mx-3 border-b-2 outline-none border-gray-400"
                            type="text"
                            id="description"
                            ref={descriptionField}
                        ></input>
                    </div>
                    <div className="mt-6">
                        <input
                            className="w-full lg:w-auto px-4 h-10 font-bold text-gray-600 bg-green-200 rounded-md cursor-pointer hover:bg-green-300 hover:shadow-sm"
                            type="submit"
                            value="Create!"
                        />
                    </div>
                </form>
            </div>
        </RequireAuth>
    );
};

export default SetsCreatePage;
