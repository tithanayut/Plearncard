import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

import Profile from "../../components/Profile";

const ProfileDeletePage = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	if (loading) return null;
	if (!loading && !session) {
		router.replace("/login");
	}

	const [error, setError] = useState(null);
	const deleteAccountHandler = async () => {
		const res = await fetch("/api/users/me", {
			method: "DELETE",
		});
		const data = await res.json();

		if (data.errors) {
			setError(data.errors);
			return;
		}

		signOut({
			redirect: false,
			callbackUrl: "/",
		});
	};

	return (
		<Fragment>
			{session ? (
				<Profile username={session.user.name} />
			) : (
				<Profile username="" />
			)}
			<div className="w-5/6 lg:w-2/3 mt-8 mx-auto text-gray-600">
				<div className="mt-4">
					<h1 className="flex items-center text-2xl font-bold text-red-600">
						<svg
							className="w-6 h-6 mr-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						Delete Account
					</h1>
					{error && (
						<div className="flex justify-center mt-6">
							<p className="flex justify-center items-center w-full px-3 py-3 text-gray-600 bg-red-100 rounded-lg">
								<span className="font-bold mr-2">
									{error.join(", ")}
								</span>
							</p>
						</div>
					)}
					<div className="text-gray-600 mt-4">
						<p className="font-bold">
							You are about to delete your account at Plearncard.
						</p>
						<p className="mt-1">
							By clicking{" "}
							<span className="text-red-600">
								"Confirm delete my account"
							</span>{" "}
							below, you acknowledge that the following actions
							will be processed.
						</p>
						<ul className="list-disc list-inside mt-1">
							<li>
								All flashcards you created at Plearncard will be
								deleted from Plearncard server.
							</li>
							<li>
								Your user profile, including your name, email
								and image (if exists), will be deleted from
								Plearncard server.
							</li>
							<li>
								Your account information, including your User
								ID, OAuth profile, OAuth Access Token, and OAuth
								Refresh Token (if exists) will be deleted from
								Plearncard server. However, Plearncard will
								continue to be listed as an authorized app on
								your OAuth provider website. You can delete
								Plearncard from the list at your OAuth provider
								website if you would like.
							</li>
						</ul>
						<p className="font-bold mt-2">
							Please note that this is a one-way operation. Once
							your data have been deleted, it <u>cannot</u> be
							recovered.
						</p>
						<p className="font-bold mt-2">
							If you confirm to delete your account, please click
							on the button below. You will be redirected to
							Plearncard front page after the account deletion has
							been complete.
						</p>
					</div>
				</div>
				<div className="flex" onClick={deleteAccountHandler}>
					<p className="flex justify-center items-center w-full md:w-auto px-8 h-10 mt-6 bg-red-200 text-red-600 font-bold rounded-lg cursor-pointer hover:bg-red-300 hover:shadow-sm">
						Confirm delete my account
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileDeletePage;
