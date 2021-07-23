import { useState, useEffect, useCallback, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Profile from "../../components/Profile";
import PlusIcon from "../../components/icons/PlusIcon";

const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const ProfilePage = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    const [joinedSince, setjoinedSince] = useState(null);
    const loadProfile = useCallback(async () => {
        const res = await fetch("/api/users/me");
        const data = await res.json();

        if (data.errors) {
            setjoinedSince("...");
            return;
        }

        const date = new Date(data.createdAt);

        setjoinedSince(
            date.getDate() +
                " " +
                MONTH[date.getMonth()] +
                " " +
                date.getFullYear()
        );
    }, [setjoinedSince]);
    useEffect(loadProfile, [loadProfile]);

    // Authentication
    if (loading) return null;
    if (!loading && !session) {
        router.replace("/login");
    }

    return (
        <Fragment>
            {session ? (
                <Profile username={session.user.name} />
            ) : (
                <Profile username="" />
            )}

            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto text-gray-600">
                {joinedSince ? (
                    <Fragment>
                        <div className="block sm:flex justify-between items-center">
                            <p>
                                Joined since {joinedSince ? joinedSince : "..."}
                            </p>
                            <div className="flex mt-4 sm:mt-0">
                                <Link href="/sets">
                                    <span className="flex justify-center items-center px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                                        View My Sets
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <Link href="/create">
                                    <span className="flex justify-center items-center ml-2 px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                                        Create
                                        <PlusIcon />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold text-green-600">
                                Account Setting
                            </h2>
                            <ul className="flex flex-col mt-2 font-semibold">
                                <li className="flex items-center my-1 text-red-600 cursor-pointer">
                                    <Link href="/profile/delete">
                                        <span className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            Delete account
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Fragment>
                ) : (
                    <div className="loader">Loading...</div>
                )}
            </div>
        </Fragment>
    );
};

export default ProfilePage;
