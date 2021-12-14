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
        <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
            <div className="flex justify-center">
                <h1 className="text-2xl text-green-600 font-bold">
                    {t("login_to_plearncard")}
                </h1>
            </div>
            <div className="flex justify-center text-center mt-6">
                <p className="leading-7">
                    <span className="mr-2 text-green-600 font-bold">
                        {t("hello")}
                    </span>
                    {t("login_desc_1")} <br /> {t("login_desc_2")}
                </p>
            </div>
            <div className="flex justify-center my-12">
                <span
                    className="flex justify-center items-center px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
                    onClick={signIn}
                >
                    {t("proceed_to_login")}
                    <LoginIcon className="w-5 h-5 ml-1" />
                </span>
            </div>
            <div className="flex justify-center text-center mt-8">
                <p>
                    <span className="mr-2 text-green-600 font-bold">
                        {t("login_desc_3")}
                    </span>
                    {t("login_desc_4")}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
