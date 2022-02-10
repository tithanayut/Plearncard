import Link from "next/link";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
import SetsGrid from "./SetsGrid/SetsGrid";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import PlusIcon from "../../icons/PlusIcon";

const SetsIndexPage = () => {
    const [data, error] = useFetch("/api/sets?recent=6");

    const { t } = useTranslation(["sets", "common"]);

    if (!data) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <RequireAuth>
                <ErrorDialog msg={error} />
            </RequireAuth>
        );
    }

    let recentSets;
    if (data.length === 0) {
        recentSets = (
            <div className="mt-6 flex justify-center">
                <p className="flex w-full items-center justify-center rounded-lg bg-green-100 p-3 font-bold text-gray-600 lg:w-1/2">
                    {t("no_recent_set")}
                </p>
            </div>
        );
    } else {
        recentSets = <SetsGrid sets={data} />;
    }

    return (
        <RequireAuth>
            <div className="mx-auto mt-8 w-5/6 lg:w-2/3">
                <div className="block items-center justify-between md:flex">
                    <div>
                        <h1 className="text-2xl font-bold text-green-600">
                            {t("common:welcome_to_plearncard")}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {t("index_page_desc")}
                        </p>
                    </div>
                    <Link href="/create">
                        <span className="mt-4 flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 text-gray-600 hover:bg-green-300 hover:shadow-sm lg:mt-0">
                            {t("common:create")}
                            <PlusIcon className="h-5 w-5" />
                        </span>
                    </Link>
                </div>
                <div className="mt-6">
                    <p className="font-bold text-gray-600">{t("recent")}</p>
                    {recentSets}
                </div>
            </div>
        </RequireAuth>
    );
};

export default SetsIndexPage;
