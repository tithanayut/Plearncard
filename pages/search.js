import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Sets from "../components/Sets/Sets";

const SearchPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	return (
		<Fragment>
			<Head>
				<title>Flashcards</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-2/3 mt-8 mx-auto ">
				<p className="text-2xl text-green-600 font-bold">Search</p>

				<form className="mt-6 text-gray-600">
					<div className="my-2">
						<label className="font-bold" htmlFor="topic">
							Topic/Description
						</label>
						<input
							className="w-96 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="topic"
						></input>
					</div>
				</form>

				<p className="mt-8">Found 3 sets match with your search.</p>
				<Sets />
			</div>
		</Fragment>
	);
};

export default SearchPage;
