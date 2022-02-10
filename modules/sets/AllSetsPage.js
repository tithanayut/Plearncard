import Link from "next/link";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
import SetsGrid from "./SetsGrid/SetsGrid";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import PlusIcon from "../../icons/PlusIcon";

const AllSetsPage = () => {
    const [data, error] = useFetch("/api/sets");

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

    let allSets;
    if (data.length === 0) {
        allSets = (
            <div className="mt-6 flex justify-center">
                <div className="flex w-full flex-col items-center justify-center rounded-lg bg-green-100 p-3 text-center text-gray-600 lg:w-1/2">
                    <p className="font-bold">
                        {t("common:welcome_to_plearncard")}
                    </p>
                    <p>
                        {t("no_set_yet")}
                        <Link href="/create">
                            <span className="ml-1 cursor-pointer font-bold text-green-600 hover:text-green-500">
                                {t("create_one")}
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        );
    } else {
        allSets = <SetsGrid sets={data} />;
    }

    const totalSets = `${t("you_have_a_total_of")} ${data.length} ${
        data.length > 1 ? t("sets") : t("set")
    }.`;

    return (
        <RequireAuth>
            <div className="mx-auto mt-8 w-5/6 lg:w-2/3">
                <div className="flex items-center justify-between">
                    <p className="text-gray-600">{totalSets}</p>
                    <Link href="/create">
                        <span className="ml-4 flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 text-gray-600 hover:bg-green-300 hover:shadow-sm">
                            {t("common:create")}
                            <PlusIcon className="h-5 w-5" />
                        </span>
                    </Link>
                </div>
                {allSets}
            </div>
        </RequireAuth>
    );
};

export default AllSetsPage;
