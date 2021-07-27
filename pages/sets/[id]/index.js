import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import RequireAuth from "../../../modules/helpers/RequireAuth";
import useEventListener from "@use-it/event-listener";
import LoadingSpinner from "../../../modules/ui/LoadingSpinner/LoadingSpinner";

const SetPage = () => {
    const router = useRouter();

    const id = router.query.id;
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);
    const loadSet = useCallback(async () => {
        if (!id) {
            return null;
        }

        const res = await fetch("/api/sets/" + id);
        const data = await res.json();

        if (data.errors) {
            setMessage(data.errors.join(", "));
            return;
        }

        setData(data);
    }, [setData, setMessage, id]);
    useEffect(loadSet, [loadSet]);

    const [currentCard, setCurrentCard] = useState(0);
    const [viewState, setViewState] = useState(false);

    useEventListener("keydown", ({ keyCode }) => {
        // Left Arrow
        if (keyCode === 37) {
            changeCardHandler("previous");
            return;
        }
        // Right Arrow
        if (keyCode === 39) {
            changeCardHandler("next");
            return;
        }
        // Spacebar
        if (keyCode === 32) {
            flipCardHandler();
            return;
        }
    });

    const flipCardHandler = () => {
        setViewState((prevState) => !prevState);
    };

    const changeCardHandler = (action) => {
        if (action === "next") {
            setCurrentCard((prevState) => {
                setViewState(false);
                if (prevState + 1 > data.cards.length - 1) {
                    return 0;
                }
                return prevState + 1;
            });
        } else {
            setCurrentCard((prevState) => {
                setViewState(false);
                if (prevState - 1 < 0) {
                    return data.cards.length - 1;
                }
                return prevState - 1;
            });
        }
    };

    const setFavourite = async (isFavourite) => {
        const res = await fetch("/api/sets/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFavourite }),
        });
        const data = await res.json();

        if (data.errors) {
            setMessage(data.errors.join(", "));
            return;
        }

        setData(data);
    };

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
                <div className="flex justify-between">
                    <Link href="/sets">
                        <span className="flex items-center text-gray-600 cursor-pointer">
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to My Sets
                        </span>
                    </Link>
                    <Link href={"/sets/" + id + "/edit"}>
                        <span className="flex items-center text-green-600 cursor-pointer">
                            Edit
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

            <div className="w-5/6 lg:w-2/3 mt-4 mx-auto select-none">
                <div className="select-text">
                    <div className="flex items-center justify-between">
                        <p className="text-2xl mt-6 text-green-600 font-bold">
                            {data && data.name}
                        </p>
                        {data &&
                            (data.isFavourite ? (
                                <p
                                    className="flex text-yellow-500 cursor-pointer"
                                    onClick={() => {
                                        setFavourite(false);
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>Favourite</span>
                                </p>
                            ) : (
                                <p
                                    className="flex text-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setFavourite(true);
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                    <span>Not Favourite</span>
                                </p>
                            ))}
                    </div>
                    <p className="text-gray-600 font-semibold mt-2">
                        {data && data.description}
                    </p>
                </div>

                {!data && !message ? (
                    <LoadingSpinner />
                ) : (
                    message && (
                        <div className="flex justify-center mt-6 select-text">
                            <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-red-100 rounded-lg">
                                <span className="font-bold mr-2">Error:</span>
                                {message}
                            </p>
                        </div>
                    )
                )}

                {data &&
                    (data.cards.length > 0 ? (
                        <>
                            <div className="mt-4 text-lg text-center text-gray-600 font-bold">
                                <p>
                                    Card {currentCard + 1} of{" "}
                                    {data ? data.cards.length : "..."}
                                </p>
                            </div>
                            <div className="flex justify-around items-center">
                                <div className="hidden md:flex justify-end w-1/4">
                                    <svg
                                        className="w-9 h-9 mr-4 cursor-pointer"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => {
                                            changeCardHandler("previous");
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="flex justify-center w-full lg:w-1/2 cursor-pointer"
                                    onClick={flipCardHandler}
                                >
                                    <div
                                        className={[
                                            "flex justify-center items-center w-96 mt-4 rounded-xl",
                                            !viewState
                                                ? "bg-green-100"
                                                : "bg-yellow-100",
                                        ].join(" ")}
                                        style={{ minHeight: "300px" }}
                                    >
                                        <p className="text-xl text-center text-gray-600 font-semibold p-6">
                                            {data && !viewState
                                                ? data.cards[currentCard].front
                                                : data.cards[currentCard].back}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex justify-start w-1/4">
                                    <svg
                                        className="w-9 h-9 ml-4 cursor-pointer"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => {
                                            changeCardHandler("next");
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex justify-center items-center text-gray-600 mt-6 font-semibold">
                                <div
                                    className="flex md:hidden pr-10 cursor-pointer"
                                    onClick={() => {
                                        changeCardHandler("previous");
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={flipCardHandler}
                                >
                                    Flip
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
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="flex md:hidden pl-10 cursor-pointer"
                                    onClick={() => {
                                        changeCardHandler("next");
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-8 text-center text-gray-600 select-text">
                                <p>
                                    Use arrow buttons to switch cards. Click
                                    flip to flip between sides.
                                    <br />
                                    <span className="hidden xl:block">
                                        Alternatively, on a computer, use the
                                        left/right arrow key or spacebar.
                                    </span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center mt-6 select-text">
                            <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-red-600 bg-gray-100 rounded-lg">
                                <span className="font-bold mr-2">
                                    There is no card in this set.
                                </span>
                            </p>
                        </div>
                    ))}
            </div>
        </RequireAuth>
    );
};

export default SetPage;
