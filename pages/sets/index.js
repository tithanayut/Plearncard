import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import RequireAuth from "../../modules/helpers/RequireAuth";

import Sets from "../../components/Sets/Sets";
import PlusIcon from "../../components/icons/PlusIcon";

const CollectionPage = () => {
    const [content, setContent] = useState(null);
    const [totalSet, settotalSet] = useState("#");
    const loadSets = useCallback(async () => {
        const res = await fetch("/api/sets");
        const data = await res.json();

        if (data.errors) {
            setContent(
                <div className="flex justify-center mt-6">
                    <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-red-100 rounded-lg">
                        <span className="font-bold mr-2">Error:</span>
                        {data.errors.join(", ")}
                    </p>
                </div>
            );
            return;
        }

        if (data.length === 0) {
            settotalSet(0);
            setContent(
                <div className="flex justify-center mt-6">
                    <div className="flex flex-col justify-center items-center text-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-green-100 rounded-lg">
                        <p className="font-bold">Welcome to Plearncard!</p>
                        <p>
                            You don&apos;t have any set yet. You may want to
                            <Link href="/create">
                                <span className="ml-1 text-green-600 font-bold cursor-pointer hover:text-green-500">
                                    create one
                                </span>
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            );
            return;
        }

        settotalSet(data.length);
        setContent(
            <div>
                <Sets sets={data} />
            </div>
        );
    }, [settotalSet, setContent]);
    useEffect(loadSets, [loadSets]);

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                        {content && (
                            <span>
                                You have a total of{" "}
                                {totalSet > 1
                                    ? totalSet + " sets"
                                    : totalSet + " set"}
                                .
                            </span>
                        )}
                    </p>
                    <Link href="/create">
                        <span className="flex justify-center items-center ml-4 px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                            Create
                            <PlusIcon />
                        </span>
                    </Link>
                </div>
                {content ? content : <div className="loader">Loading...</div>}
            </div>
        </RequireAuth>
    );
};

export default CollectionPage;
