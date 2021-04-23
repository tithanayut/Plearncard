import Link from "next/link";

const Set = (props) => {
	return (
		<Link href="/cards/1">
			<div className="flex flex-col justify-end m-1 p-4 text-gray-600 bg-gray-100 rounded-md cursor-pointer hover:shadow">
				<div>
					<p className="text-lg font-bold">Thai Level I</p>
					<p>2 cards</p>
				</div>
				<div className="text-sm mt-4">
					<p className="flex items-center">
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
								strokeWidth="2"
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							></path>
						</svg>
						Created 2021
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Set;
