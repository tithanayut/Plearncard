import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import cuid from "cuid";

import CardInputs from "../../../components/CardInputs/CardInputs";

const EditSetPage = () => {
	const router = useRouter();
	const [session, authLoading] = useSession();

	const topicField = useRef();
	const descriptionField = useRef();

	const id = router.query.id;
	const [loading, setLoading] = useState(true);
	const [initData, setInitData] = useState(null);
	const [cards, setCards] = useState([]);
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

		const initCards = [];
		data.cards.forEach((card) => {
			initCards.push({ id: cuid(), front: card.front, back: card.back });
		});
		setCards(initCards);

		setInitData(data);
		setLoading(false);
	}, [setInitData, setMessage, id]);
	useEffect(loadSet, [loadSet]);

	// Authentication
	if (authLoading) return null;
	if (!authLoading && !session) {
		router.replace("/login");
	}

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

		const res = await fetch("/api/sets/" + id, {
			method: "DELETE",
		});
		const data = await res.json();

		if (data.errors) {
			setMessage(data.errors.join(", "));
			setLoading(false);
			return;
		}

		router.replace("/sets");
	};

	const saveToDBHandler = async () => {
		setLoading(true);
		const body = {
			id,
			topic: topicField.current.value,
			description: descriptionField.current.value,
			total: cards.length,
			cards,
		};

		const res = await fetch("/api/sets/" + id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await res.json();

		if (data.errors) {
			setMessage(data.errors.join(", "));
			setLoading(false);
			return;
		}

		router.push("/sets/" + id);
	};

	return (
		<Fragment>
			<div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
				<div className="flex justify-between">
					<Link href={"/sets/" + id}>
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
							Back
						</span>
					</Link>
					{!message && !loading && (
						<div
							className="flex items-center text-red-600 cursor-pointer"
							onClick={deleteSetHandler}
						>
							Delete
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
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>
					)}
				</div>
			</div>

			{loading && !message ? (
				<div className="loader">Loading...</div>
			) : (
				message && (
					<div className="flex justify-center mt-6">
						<p className="flex justify-center items-center w-1/2 py-3 text-gray-600 bg-red-100 rounded-lg">
							<span className="font-bold mr-2">Error:</span>
							{message}
						</p>
					</div>
				)
			)}

			{!loading && (
				<div className="w-5/6 lg:w-2/3 mx-auto ">
					<form className="mt-6 text-gray-600">
						<div className="my-2">
							<label className="font-bold" htmlFor="topic">
								Topic
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
								Description
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
						<p>Cards</p>
					</div>
					<div className="flex justify-center mt-2">
						<span
							className="flex justify-center items-center px-4 h-9 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
							onClick={addCardHandler}
						>
							Add Card
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
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
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
							Save
							<svg
								className="w-6 h-6 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
								/>
							</svg>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default EditSetPage;
