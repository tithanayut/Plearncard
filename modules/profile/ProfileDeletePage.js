import { useState } from "react";
import { useSession, signOut } from "next-auth/client";
import RequireAuth from "../../helpers/auth/RequireAuth";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import CrossIcon from "../../icons/CrossIcon";

const ProfilePage = () => {
    const [session] = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <RequireAuth>
                <ErrorDialog msg={error} />
            </RequireAuth>
        );
    }

    const deleteAccountHandler = async () => {
        setLoading(true);
        const res = await fetch("/api/me", {
            method: "DELETE",
        });
        const resJson = await res.json();

        if (resJson.errors) {
            setError(resJson.errors.join(", "));
            setLoading(false);
            return;
        }

        signOut({
            redirect: false,
            callbackUrl: "/",
        });
    };

    return (
        <RequireAuth>
            <ProfileBanner session={session} />

            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto text-gray-600">
                <div className="mt-4">
                    <h1 className="flex items-center text-2xl font-bold text-red-600">
                        <CrossIcon />
                        Delete Account
                    </h1>
                    <div className="text-gray-600 mt-4">
                        <p className="font-bold">
                            You are about to delete your account at Plearncard.
                        </p>
                        <p className="mt-1">
                            By clicking{" "}
                            <span className="text-red-600">
                                &quot;Confirm delete my account&quot;
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
                            been completed.
                        </p>
                    </div>
                </div>
                <div className="flex" onClick={deleteAccountHandler}>
                    <p className="flex justify-center items-center w-full md:w-auto px-8 h-10 mt-6 bg-red-200 text-red-600 font-bold rounded-lg cursor-pointer hover:bg-red-300 hover:shadow-sm">
                        Confirm delete my account
                    </p>
                </div>
            </div>
        </RequireAuth>
    );
};

export default ProfilePage;
