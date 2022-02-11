import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import { useTranslation } from "next-i18next";
import LoginIcon from "../../icons/LoginIcon";

const LoginPage = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    const { t } = useTranslation(["staticpages", "common"]);

    // Redirect if logged in
    if (loading) return null;
    if (!loading && session) {
        router.replace("/home");
    }

    return (
        <div className="mx-auto mt-8 w-5/6 lg:w-2/3">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold text-green-600">
                    {t("login_to_plearncard")}
                </h1>
            </div>
            <div className="mt-6 flex justify-center text-center">
                <p className="leading-7">
                    <span className="mr-2 font-bold text-green-600">
                        {t("hello")}
                    </span>
                    {t("login_desc_1")} <br /> {t("login_desc_2")}
                </p>
            </div>
            <div className="my-12 flex justify-center">
                <span
                    className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 text-gray-600 hover:bg-green-300 hover:shadow-sm"
                    onClick={signIn}
                >
                    {t("proceed_to_login")}
                    <LoginIcon className="ml-1 h-5 w-5" />
                </span>
            </div>
            <div className="mt-8 flex justify-center text-center">
                <p>
                    <span className="mr-2 font-bold text-green-600">
                        {t("login_desc_3")}
                    </span>
                    {t("login_desc_4")}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
