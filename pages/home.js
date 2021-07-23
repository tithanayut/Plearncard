import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Sets from "../components/Sets/Sets";
import PlusIcon from "../components/icons/PlusIcon";

const HomePage = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    const [content, setContent] = useState(null);
    const loadRecentSets = useCallback(async () => {
        const res = await fetch("/api/sets?recent=6");
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
            setContent(
                <div className="flex justify-center mt-6">
                    <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-green-100 rounded-lg">
                        <span className="font-bold mr-2">
                            You have no recent set yet.
                        </span>
                    </p>
                </div>
            );
            return;
        }

        setContent(
            <div>
                <Sets sets={data} />
            </div>
        );
    }, [setContent]);
    useEffect(loadRecentSets, [loadRecentSets]);

    // Authentication
    if (loading) return null;
    if (!loading && !session) {
        router.replace("/login");
    }

    return (
        <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
            <div className="block md:flex justify-between items-center">
                <div>
                    <h1 className="text-2xl text-green-600 font-bold">
                        Welcome to Plearncard!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Below is your recent sets. Or click create to build new
                        one.
                    </p>
                </div>
                <Link href="/create">
                    <span className="flex justify-center items-center px-4 h-10 mt-4 lg:mt-0 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                        Create
                        <PlusIcon />
                    </span>
                </Link>
            </div>
            <div className="mt-6">
                <p className="text-gray-600 font-bold">Recent</p>
                {content ? content : <div className="loader">Loading...</div>}
            </div>
        </div>
    );
};

export default HomePage;
