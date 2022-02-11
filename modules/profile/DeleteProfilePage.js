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

            <div className="mx-auto mt-8 w-5/6 text-gray-600 lg:w-2/3">
                <div className="mt-4">
                    <h1 className="flex items-center text-2xl font-bold text-red-600">
                        <CrossIcon className="mr-1 h-6 w-6" />
                        {t("delete_account")}
                    </h1>
                    <div className="mt-4 text-gray-600">
                        <p className="font-bold">{t("delete_remark_1")}</p>
                        <p className="mt-1">
                            {t("delete_remark_2") + " "}
                            <span className="text-red-600">
                                &quot;{t("confirm_delete_my_account")}&quot;
                            </span>
                            {" " + t("delete_remark_3")}
                        </p>
                        <ul className="mt-1 list-inside list-disc">
                            <li>{t("delete_remark_4")}</li>
                            <li>{t("delete_remark_5")}</li>
                            <li>{t("delete_remark_6")}</li>
                        </ul>
                        <p className="mt-2 font-bold">{t("delete_remark_7")}</p>
                        <p className="mt-2 font-bold">{t("delete_remark_8")}</p>
                    </div>
                </div>
                <div className="flex" onClick={deleteAccountHandler}>
                    <p className="mt-6 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-red-200 px-8 font-bold text-red-600 hover:bg-red-300 hover:shadow-sm md:w-auto">
                        {t("confirm_delete_my_account")}
                    </p>
                </div>
            </div>
        </RequireAuth>
    );
};

export default DeleteProfilePage;
