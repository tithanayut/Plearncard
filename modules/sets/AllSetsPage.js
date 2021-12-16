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
            <div className="flex justify-center mt-6">
                <div className="flex flex-col justify-center items-center text-center w-full lg:w-1/2 p-3 text-gray-600 bg-green-100 rounded-lg">
                    <p className="font-bold">
                        {t("common:welcome_to_plearncard")}
                    </p>
                    <p>
                        {t("no_set_yet")}
                        <Link href="/create">
                            <span className="ml-1 text-green-600 font-bold cursor-pointer hover:text-green-500">
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
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">{totalSets}</p>
                    <Link href="/create">
                        <span className="flex justify-center items-center ml-4 px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                            {t("common:create")}
                            <PlusIcon className="w-5 h-5" />
                        </span>
                    </Link>
                </div>
                {allSets}
            </div>
        </RequireAuth>
    );
};

export default AllSetsPage;
