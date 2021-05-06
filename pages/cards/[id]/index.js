import { useState, useEffect, useCallback, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const SetPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();

	const id = router.query.id;
	const [data, setData] = useState(null);
	const [message, setMessage] = useState(null);
	const loadSet = useCallback(async () => {
		if (!id) {
			return null;
		}

		const res = await fetch("/api/cards/" + id);
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

	// Authentication
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

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

	return (
		<Fragment>
			<div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
				<div className="flex justify-between">
					<Link href="/cards">
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
							Back to Collection
						</span>
					</Link>
					<Link href={"/cards/" + id + "/edit"}>
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
					<p className="text-2xl mt-6 text-green-600 font-bold">
						{data && data.name}
					</p>
					<p className="text-gray-600 font-semibold mt-2">
						{data && data.description}
					</p>
				</div>

				{!data && !message ? (
					<div className="loader">Loading...</div>
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
						<Fragment>
							<div className="mt-4 text-lg text-center text-gray-600 font-bold">
								<p>
									Card {currentCard + 1} of{" "}
									{data ? data.cards.length : "..."}
								</p>
							</div>
							<div className="flex justify-around items-center">
								<div
									className="hidden md:flex justify-end w-1/4 cursor-pointer"
									onClick={() => {
										changeCardHandler("previous");
									}}
								>
									<svg
										className="w-6 h-6 mr-4"
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
								<div
									className="hidden md:flex justify-start w-1/4 cursor-pointer"
									onClick={() => {
										changeCardHandler("next");
									}}
								>
									<svg
										className="w-6 h-6 ml-4"
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
						</Fragment>
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
		</Fragment>
	);
};

export default SetPage;
