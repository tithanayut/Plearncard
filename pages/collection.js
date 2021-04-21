import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import Profile from "../components/Profile";
import Sets from "../components/Sets/Sets";

const CollectionPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Flashcards</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Profile username="bankbkbkk" />
			<div className="w-2/3 mt-8 mx-auto">
				<div className="flex justify-between items-center">
					<p>You have 3 sets of cards in your collection.</p>
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
									strokeWidth="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								></path>
							</svg>
						</span>
					</Link>
				</div>
				<Sets />
			</div>
		</Fragment>
	);
};

export default CollectionPage;
