import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useEventListener from "@use-it/event-listener";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import BackIcon from "../../icons/BackIcon";
import EditIcon from "../../icons/EditIcon";
import FavouriteSolidIcon from "../../icons/FavouriteSolidIcon";
import FavouriteOutlineIcon from "../../icons/FavouriteOutlineIcon";

const ViewSetPage = () => {
    const router = useRouter();
    const setId = router.query.id;
    const apiUrl = setId ? `/api/sets/${setId}` : null;

    const [data, error] = useFetch(apiUrl);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentViewState, setCurrentViewState] = useState(false);

    const changeCurrentCardHandler = (action) => {
        if (action === "next") {
            setCurrentCardIndex((prevState) => {
                setCurrentViewState(false);
                if (prevState + 1 > data.cards.length - 1) {
                    return 0;
                }
                return prevState + 1;
            });
        } else if (action === "prev") {
            setCurrentCardIndex((prevState) => {
                setCurrentViewState(false);
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

    // const setFavourite = async (isFavourite) => {
    //     const res = await fetch(apiUrl, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ isFavourite }),
    //     });
    //     const resJson = await res.json();
    // };

    useEventListener("keydown", ({ keyCode }) => {
        // Left Arrow
        if (keyCode === 37) {
            changeCurrentCardHandler("prev");
            return;
        }
        // Right Arrow
        if (keyCode === 39) {
            changeCurrentCardHandler("next");
            return;
        }
        // Spacebar
        if (keyCode === 32) {
            flipCardHandler();
            return;
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
            <>
                <div className="mt-4 text-lg text-center text-gray-600 font-bold">
                    <p>
                        Card {currentCardIndex + 1} of {data.cards.length}
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
                                changeCurrentCardHandler("prev");
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
                                !currentViewState
                                    ? "bg-green-100"
                                    : "bg-yellow-100",
                            ].join(" ")}
                            style={{ minHeight: "300px" }}
                        >
                            <p className="text-xl text-center text-gray-600 font-semibold p-6">
                                {!currentViewState
                                    ? data.cards[currentCardIndex].front
                                    : data.cards[currentCardIndex].back}
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
                                changeCurrentCardHandler("next");
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
                            changeCurrentCardHandler("prev");
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
                            changeCurrentCardHandler("next");
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
                        Use arrow buttons to switch cards. Click flip to flip
                        between sides.
                        <br />
                        <span className="hidden xl:block">
                            Alternatively, on a computer, use the left/right
                            arrow key or spacebar.
                        </span>
                    </p>
                </div>
            </>
        );
    } else {
        setView = (
            <div className="flex justify-center mt-6 select-text">
                <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-red-600 bg-gray-100 rounded-lg">
                    <span className="font-bold mr-2">
                        There is no card in this set.
                    </span>
                </p>
            </div>
        );
    }

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
                <div className="flex justify-between">
                    <Link href="/sets">
                        <span className="flex items-center text-gray-600 cursor-pointer">
                            <BackIcon className="w-4 h-4 mr-1" />
                            Back to My Sets
                        </span>
                    </Link>
                    <Link href={`/sets/${setId}/edit`}>
                        <span className="flex items-center text-green-600 cursor-pointer">
                            Edit
                            <EditIcon className="w-4 h-4 ml-2" />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="w-5/6 lg:w-2/3 mt-4 mx-auto select-none">
                <div className="select-text">
                    <div className="flex items-center justify-between">
                        <p className="text-2xl mt-6 text-green-600 font-bold">
                            {data.name}
                        </p>
                        {data.isFavourite ? (
                            <p
                                className="flex text-yellow-500 cursor-pointer"
                                // onClick={() => {
                                //     setFavourite(false);
                                // }}
                            >
                                <FavouriteSolidIcon className="w-6 h-6 mr-1" />
                                <span>Favourite</span>
                            </p>
                        ) : (
                            <p
                                className="flex text-gray-500 cursor-pointer"
                                // onClick={() => {
                                //     setFavourite(true);
                                // }}
                            >
                                <FavouriteOutlineIcon className="w-6 h-6 mr-1" />
                                <span>Not Favourite</span>
                            </p>
                        )}
                    </div>
                    <p className="text-gray-600 font-semibold mt-2">
                        {data.description}
                    </p>
                </div>

                {setView}
            </div>
        </RequireAuth>
    );
};

export default ViewSetPage;
