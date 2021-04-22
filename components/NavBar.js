import { Fragment } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";

const NavBar = () => {
	const [session, loading] = useSession();

	return (
		<nav className="flex justify-between items-center h-14 p-6 bg-green-500 text-white">
			<div className="flex items-center">
				<h1 className="text-2xl font-bold cursor-pointer">
					<Link href="/">Plearncard</Link>
				</h1>
				{session && (
					<ul className="flex">
						<li className="ml-6 mr-3 cursor-pointer">
							<Link href="/home">Home</Link>
						</li>
						<li className="mx-3 cursor-pointer">
							<Link href="/collection">Collection</Link>
						</li>
						<li className="mx-3 cursor-pointer">
							<Link href="/search">
								<span className="flex items-center">
									<svg
										className="w-5 h-5 mr-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
									Search
								</span>
							</Link>
						</li>
					</ul>
				)}
			</div>

			<ul className="flex">
				{session && (
					<li className="flex mr-4 cursor-pointer">
						<Link href="/profile">
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
									strokeWidth="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								></path>
							</svg>
						</Link>
					</li>
				)}
				{!session && (
					<Fragment>
						<li className="mr-4 cursor-pointer">
							<Link href="/login">Login</Link>
						</li>
						<li className="mr-4 cursor-pointer">
							<Link href="/register">Register</Link>
						</li>
					</Fragment>
				)}
				{session && (
					<li className="cursor-pointer">
						<p
							onClick={() => {
								signOut({
									redirect: false,
									callbackUrl: "/",
								});
							}}
						>
							Logout
						</p>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
