import { useState, useEffect, useCallback, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Sets from "../components/Sets/Sets";

const HomePage = () => {
	const router = useRouter();
	const [session, loading] = useSession();

	const [content, setContent] = useState(null);
	const loadRecentSets = useCallback(async () => {
		const res = await fetch("/api/cards?recent=6");
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
			setContent(
				<div className="flex justify-center mt-6">
					<p className="flex justify-center items-center w-1/2 py-3 text-gray-600 bg-green-100 rounded-lg">
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
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<div className="w-2/3 mt-8 mx-auto">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl text-green-600 font-bold">
							Welcome to Plearncard!
						</h1>
						<p className="text-gray-600 mt-2">
							Below is your recent sets. Or click create to build
							new one.
						</p>
					</div>
					<Link href="/create">
						<span className="flex justify-center items-center w-24 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
							Create
							<svg
								className="w-5 h-5 ml-1"
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
								></path>
							</svg>
						</span>
					</Link>
				</div>
				<div className="mt-6">
					<p className="text-gray-600 font-bold">Recent</p>
					{content}
				</div>
			</div>
		</Fragment>
	);
};

export default HomePage;
