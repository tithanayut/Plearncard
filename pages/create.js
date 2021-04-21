import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const CreatePage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-2/3 mt-8 mx-auto ">
				<p className="text-2xl text-green-600 font-bold">
					Create new set
				</p>

				<form className="mt-6 text-gray-600">
					<div className="my-2">
						<label className="font-bold" htmlFor="topic">
							Topic
						</label>
						<input
							className="w-96 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="topic"
						></input>
					</div>
					<div className="my-2">
						<label className="font-bold" htmlFor="description">
							Description
						</label>
						<input
							className="w-2/3 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="description"
						></input>
					</div>
					<div className="mt-6">
						<input
							className="w-24 h-10 font-bold text-gray-600 bg-green-200 rounded-md cursor-pointer hover:bg-green-300 hover:shadow-sm"
							type="submit"
							value="Create!"
						/>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default CreatePage;
