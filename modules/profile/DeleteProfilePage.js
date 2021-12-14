import { useState } from "react";
import { useSession, signOut } from "next-auth/client";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import CrossIcon from "../../icons/CrossIcon";

const DeleteProfilePage = () => {
    const [session] = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { t } = useTranslation(["profile", "common"]);

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
                        <CrossIcon className="w-6 h-6 mr-1" />
                        {t("delete_account")}
                    </h1>
                    <div className="text-gray-600 mt-4">
                        <p className="font-bold">{t("delete_remark_1")}</p>
                        <p className="mt-1">
                            {t("delete_remark_2") + " "}
                            <span className="text-red-600">
                                &quot;{t("confirm_delete_my_account")}&quot;
                            </span>
                            {" " + t("delete_remark_3")}
                        </p>
                        <ul className="list-disc list-inside mt-1">
                            <li>{t("delete_remark_4")}</li>
                            <li>{t("delete_remark_5")}</li>
                            <li>{t("delete_remark_6")}</li>
                        </ul>
                        <p className="font-bold mt-2">{t("delete_remark_7")}</p>
                        <p className="font-bold mt-2">{t("delete_remark_8")}</p>
                    </div>
                </div>
                <div className="flex" onClick={deleteAccountHandler}>
                    <p className="flex justify-center items-center w-full md:w-auto px-8 h-10 mt-6 bg-red-200 text-red-600 font-bold rounded-lg cursor-pointer hover:bg-red-300 hover:shadow-sm">
                        {t("confirm_delete_my_account")}
                    </p>
                </div>
            </div>
        </RequireAuth>
    );
};

export default DeleteProfilePage;
