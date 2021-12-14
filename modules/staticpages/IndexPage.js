import Link from "next/link";
import { useTranslation } from "next-i18next";
import FlashIcon from "../../icons/FlashIcon";
import GitHubIcon from "../../icons/GitHubIcon";

const IndexPage = () => {
    const { t } = useTranslation(["staticpages", "common"]);

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <img className="h-24 w-24 mt-14" src="/favicon.svg" />
                <p className="text-2xl text-green-600 font-bold">
                    {t("welcome_to_plearncard")}
                </p>
                <p className="text-xl text-center text-gray-600 mx-4 mt-2 mb-14">
                    {t("plearncard_desc")}
                </p>
            </div>
            <div className="flex flex-col items-center text-green-600 mt-8">
                <p className="text-xl font-bold">{t("are_you_ready")}</p>
                <Link href="/login">
                    <span className="flex justify-center items-center px-4 h-10 mt-4 font-bold bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                        {t("get_started")}
                        <FlashIcon className="w-5 h-5 ml-1" />
                    </span>
                </Link>
            </div>
            <div className="mt-24">
                <a
                    className="flex justify-center items-center cursor-pointer"
                    href="https://github.com/tithanayut/Plearncard"
                    target="_blank"
                    rel="noreferrer"
                >
                    {t("view_on_github")}
                    <GitHubIcon className="w-8 h-8 ml-2" />
                </a>
            </div>
        </>
    );
};

export default IndexPage;