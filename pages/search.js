import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Sets from "../components/Sets/Sets";

const SearchPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();

	const [initialSets, setinitialSets] = useState(null);
	const [totalSet, settotalSet] = useState(0);
	const [content, setContent] = useState(null);
	const loadSets = useCallback(async () => {
		const res = await fetch("/api/cards");
		const data = await res.json();

		if (data.errors) {
			setContent(
				<div className="flex justify-center mt-6">
					<p className="flex justify-center items-center w-1/2 py-3 text-gray-600 bg-red-100 rounded-lg">
						<span className="font-bold mr-2">Error:</span>
						{data.errors.join(", ")}
					</p>
				</div>
			);
			return;
		}

		setinitialSets(data);
	}, [setinitialSets, setContent]);
	useEffect(loadSets, [loadSets]);

	// Authentication
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	const searchHandler = (event) => {
		const query = event.target.value;
		if (!query) {
			settotalSet(0);
			setContent(null);
			return;
		}

		const data = initialSets.filter((set) =>
			set.name.match(new RegExp(query, "i"))
		);
		settotalSet(data.length);

		if (data.length === 0) {
			setContent(
				<div className="flex justify-center mt-6">
					<p className="flex justify-center items-center w-1/2 py-3 text-gray-600 bg-green-100 rounded-lg">
						<span className="font-bold mr-2">Not Found</span>
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
	};

	return (
		<div className="w-2/3 mt-8 mx-auto ">
			<p className="text-2xl text-green-600 font-bold">Search</p>

			<form
				className="mt-6 text-gray-600"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				{initialSets ? (
					<div className="my-2">
						<label className="font-bold" htmlFor="topic">
							Topic
						</label>
						<input
							className="w-96 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="topic"
							onChange={searchHandler}
						></input>
					</div>
				) : (
					!content && <div className="loader">Loading...</div>
				)}
			</form>

			{initialSets &&
				content &&
				(totalSet > 1 ? (
					<p className="mt-8">{`Found ${totalSet} sets match with your search`}</p>
				) : (
					<p className="mt-8">{`Found ${totalSet} set match with your search`}</p>
				))}

			{content}
		</div>
	);
};

export default SearchPage;
