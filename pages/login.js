import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

const LoginPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && session) {
		router.replace("/home");
	}

	return (
		<div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
			<div className="flex justify-center">
				<h1 className="text-2xl text-green-600 font-bold">
					Login to Plearncard
				</h1>
			</div>
			<div className="flex justify-center text-center mt-6">
				<p className="leading-7">
					<span className="mr-2 text-green-600 font-bold">Hello!</span>
					We use OAuth for authentication and authorization here. <br />
					Click on the button below to choose your favourite provider.
				</p>
			</div>
			<div className="flex justify-center my-12">
				<span
					className="flex justify-center items-center px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
					onClick={signIn}
				>
					Proceed to Login
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
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
				</span>
			</div>
			<div className="flex justify-center text-center mt-8">
				<p>
					<span className="mr-2 text-green-600 font-bold">
						First time at Plearncard?
					</span>
					Just click login and select one of our login provider.
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
