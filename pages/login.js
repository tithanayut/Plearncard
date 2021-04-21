import { useRef, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

const LoginPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && session) {
		router.replace("/home");
	}

	const usernameField = useRef();
	const passwordField = useRef();

	const loginHandler = async (event) => {
		event.preventDefault();

		const result = await signIn("credentials", {
			redirect: false,
			username: usernameField.current.value,
			password: passwordField.current.value,
		});

		if (!result.error) {
			router.replace("/home");
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-2/3 mt-8 mx-auto">
				<div className="flex justify-center">
					<h1 className="text-2xl text-green-600 font-bold">
						Login with Plearncard Account
					</h1>
				</div>
				<div className="flex justify-center mt-8">
					<form
						className="flex flex-col items-center text-gray-600"
						onSubmit={loginHandler}
					>
						<div className="flex my-1">
							<label className="font-bold" htmlFor="username">
								Username:
							</label>
							<input
								className="w-48 h-8 mx-3 border-b-2 outline-none border-gray-400"
								type="text"
								id="username"
								ref={usernameField}
							/>
						</div>
						<div className="flex my-1">
							<label className="font-bold" htmlFor="password">
								Password:
							</label>
							<input
								className="w-48 h-8 mx-3 border-b-2 outline-none border-gray-400"
								type="password"
								id="password"
								ref={passwordField}
							/>
						</div>
						<div className="mt-6">
							<input
								className="w-24 h-10 font-bold text-gray-600 bg-green-200 rounded-md cursor-pointer hover:bg-green-300 hover:shadow-sm"
								type="submit"
								value="Login"
							/>
						</div>
					</form>
				</div>
				<div className="flex justify-center mt-8">
					<p>Don't have an account?</p>
					<Link href="/register">
						<p className="ml-2 text-green-600 font-bold cursor-pointer hover:text-green-500">
							Create one
						</p>
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default LoginPage;
