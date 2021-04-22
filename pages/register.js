import { useRef, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const RegisterPage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && session) {
		router.replace("/home");
	}

	const usernameField = useRef();
	const passwordField = useRef();
	const passwordConfirmationField = useRef();

	const accountRegisHandler = async (event) => {
		event.preventDefault();

		// TODO
	};

	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<div className="w-2/3 mt-8 mx-auto">
				<div className="flex justify-center">
					<h1 className="text-2xl text-green-600 font-bold">
						Register an account
					</h1>
				</div>
				<div className="flex justify-center mt-8">
					<form
						className="flex flex-col items-center text-gray-600"
						onSubmit={accountRegisHandler}
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
						<div className="flex my-1">
							<label
								className="font-bold"
								htmlFor="passwordConfirmation"
							>
								Password:
							</label>
							<input
								className="w-48 h-8 mx-3 border-b-2 outline-none border-gray-400"
								type="password"
								id="passwordConfirmation"
								ref={passwordConfirmationField}
							/>
						</div>
						<div className="mt-6">
							<input
								className="w-24 h-10 font-bold text-gray-600 bg-green-200 rounded-md cursor-pointer hover:bg-green-300 hover:shadow-sm"
								type="submit"
								value="Register"
							/>
						</div>
					</form>
				</div>
				<div className="flex justify-center mt-8">
					<p>Already have an account?</p>
					<Link href="/login">
						<p className="ml-2 text-green-600 font-bold cursor-pointer hover:text-green-500">
							Login
						</p>
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default RegisterPage;
