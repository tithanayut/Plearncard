import { useState, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Sets from "../components/Sets/Sets";

const SearchPage = () => {
	const [content, setContent] = useState(null);
	const [totalSet, settotalSet] = useState("0");

	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	const searchHandler = async (event) => {
		const query = event.target.value;
		const res = await fetch("/api/cards?q=" + encodeURI(query));
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

		if (data.length === 0) {
			settotalSet(0);
			setContent(
				<div className="flex justify-center mt-6">
					<p className="flex justify-center items-center w-1/2 py-3 text-gray-600 bg-green-100 rounded-lg">
						<span className="font-bold mr-2">Not Found</span>
					</p>
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
	};

	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<div className="w-2/3 mt-8 mx-auto ">
				<p className="text-2xl text-green-600 font-bold">Search</p>

				<form
					className="mt-6 text-gray-600"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="my-2">
						<label className="font-bold" htmlFor="topic">
							Topic/Description
						</label>
						<input
							className="w-96 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="topic"
							onChange={searchHandler}
						></input>
					</div>
				</form>

				<p className="mt-8">
					Found{" "}
					{totalSet > 1 ? totalSet + " sets" : totalSet + " set"}{" "}
					match with your search.
				</p>
				{content}
			</div>
		</Fragment>
	);
};

export default SearchPage;
