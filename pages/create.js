import { useState, useRef, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const CreatePage = () => {
	const [message, setMessage] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const topicField = useRef();
	const descriptionField = useRef();

	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	const createSetHandler = async (e) => {
		e.preventDefault();

		if (submitting) {
			return;
		}
		setSubmitting(true);

		if (!topicField.current.value || !descriptionField.current.value) {
			setSubmitting(false);
			setMessage("Please complete all fields");
			return;
		}

		const res = await fetch("/api/cards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				topic: topicField.current.value,
				description: descriptionField.current.value,
			}),
		});
		const data = await res.json();

		if (data.errors) {
			setSubmitting(false);
			setMessage(data.errors.join(", "));
			return;
		}

		router.push("/cards");
	};

	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<div className="w-2/3 mt-8 mx-auto ">
				<p className="text-2xl text-green-600 font-bold">
					Create new set
				</p>
				<form
					className="mt-6 text-gray-600"
					onSubmit={createSetHandler}
				>
					<div className="my-2">
						<label className="font-bold" htmlFor="topic">
							Topic
						</label>
						<input
							className="w-96 h-8 mx-3 border-b-2 outline-none border-gray-400"
							type="text"
							id="topic"
							ref={topicField}
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
							ref={descriptionField}
						></input>
					</div>
					{message && (
						<p className="text-red-600 mt-4">
							<span className="font-bold">Error:</span> {message}
						</p>
					)}
					<div className="mt-6">
						<input
							className="w-24 h-10 font-bold text-gray-600 bg-green-200 rounded-md cursor-pointer hover:bg-green-300 hover:shadow-sm"
							type="submit"
							value="Create!"
						/>
					</div>
					{submitting && <div className="loader">Loading...</div>}
				</form>
			</div>
		</Fragment>
	);
};

export default CreatePage;
