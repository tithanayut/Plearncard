import Link from "next/link";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import SetsGrid from "./SetsGrid/SetsGrid";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import PlusIcon from "../../icons/PlusIcon";

const SetsIndexPage = () => {
    const [data, error] = useFetch("/api/sets?recent=6");

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
            <div className="flex justify-center mt-6">
                <p className="flex justify-center items-center w-full lg:w-1/2 p-3 text-gray-600 font-bold bg-green-100 rounded-lg">
                    You have no recent set yet.
                </p>
            </div>
        );
    } else {
        recentSets = <SetsGrid sets={data} />;
    }

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
                <div className="block md:flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl text-green-600 font-bold">
                            Welcome to Plearncard!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Below is your recent sets. Or click create to build
                            new one.
                        </p>
                    </div>
                    <Link href="/create">
                        <span className="flex justify-center items-center px-4 h-10 mt-4 lg:mt-0 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                            Create
                            <PlusIcon className="w-5 h-5" />
                        </span>
                    </Link>
                </div>
                <div className="mt-6">
                    <p className="text-gray-600 font-bold">Recent</p>
                    {recentSets}
                </div>
            </div>
        </RequireAuth>
    );
};

export default SetsIndexPage;
