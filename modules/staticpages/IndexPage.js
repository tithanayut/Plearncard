import Link from "next/link";
import { useTranslation } from "next-i18next";
import FlashIcon from "../../icons/FlashIcon";
import GitHubIcon from "../../icons/GitHubIcon";

const IndexPage = () => {
    const { t } = useTranslation(["staticpages", "common"]);

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100">
                <img className="mt-14 h-24 w-24" src="/favicon.svg" />
                <p className="text-2xl font-bold text-green-600">
                    {t("welcome_to_plearncard")}
                </p>
                <p className="mx-4 mt-2 mb-14 text-center text-xl text-gray-600">
                    {t("plearncard_desc")}
                </p>
            </div>
            <div className="mt-8 flex flex-col items-center text-green-600">
                <p className="text-xl font-bold">{t("are_you_ready")}</p>
                <Link href="/login">
                    <span className="mt-4 flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 font-bold text-gray-600 hover:bg-green-300 hover:shadow-sm">
                        {t("get_started")}
                        <FlashIcon className="ml-1 h-5 w-5" />
                    </span>
                </Link>
            </div>
            <div className="mt-24">
                <a
                    className="flex cursor-pointer items-center justify-center"
                    href="https://github.com/tithanayut/Plearncard"
                    target="_blank"
                    rel="noreferrer"
                >
                    {t("view_on_github")}
                    <GitHubIcon className="ml-2 h-8 w-8" />
                </a>
            </div>
        </>
    );
};

export default IndexPage;
