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
				{!loading && session && (
					<ul className="flex">
						<li className="ml-4 md:ml-6 mr-2 cursor-pointer">
							<Link href="/home">
								<span>
									<svg
										className="w-5 h-5 md:hidden"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										/>
									</svg>
									<span className="hidden md:block">Home</span>
								</span>
							</Link>
						</li>
						<li className="mx-2 md:mx-3 cursor-pointer">
							<Link href="/cards">
								<span>
									<svg
										className="w-5 h-5 md:hidden"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
										/>
									</svg>
									<span className="hidden md:block">Collection</span>
								</span>
							</Link>
						</li>
						<li className="mx-2 md:mx-3 cursor-pointer">
							<Link href="/search">
								<span className="flex items-center">
									<svg
										className="w-5 h-5 md:mr-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
									<span className="hidden md:block">Search</span>
								</span>
							</Link>
						</li>
					</ul>
				)}
			</div>

			<ul className="flex">
				{!loading && session && (
					<li className="flex items-center mx-2 md:mx-3 cursor-pointer">
						<Link href="/profile">
							<span className="flex items-center">
								<span className="hidden md:block">{session.user.name}</span>
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
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									></path>
								</svg>
							</span>
						</Link>
					</li>
				)}
				{!loading && !session && (
					<li className="mr-4 cursor-pointer">
						<Link href="/login">Login</Link>
					</li>
				)}
				{!loading && session && (
					<li className="flex items-center ml-2 cursor-pointer">
						<p
							onClick={() => {
								signOut({
									redirect: false,
									callbackUrl: "/",
								});
							}}
						>
							<svg
								className="w-5 h-5 md:hidden"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							<span className="hidden md:block">Logout</span>
						</p>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
