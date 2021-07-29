import Link from "next/link";
import { useSession } from "next-auth/client";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorDialog from "../../components/ui/ErrorDialog/ErrorDialog";
import formatDateStrToUI from "../../helpers/date/formatDateStrToUI";
import PlusIcon from "../../icons/PlusIcon";
import SetsIcon from "../../icons/SetsIcon";
import CrossIcon from "../../icons/CrossIcon";

const ProfilePage = () => {
    const [session] = useSession();
    const [data, error] = useFetch("/api/me");

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

    const joinedSince = formatDateStrToUI(data.createdAt);

    return (
        <RequireAuth>
            <ProfileBanner session={session} />

            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto text-gray-600">
                <div className="block sm:flex justify-between items-center">
                    <p>Joined since {joinedSince}</p>
                    <div className="flex mt-4 sm:mt-0">
                        <Link href="/sets">
                            <span className="flex justify-center items-center px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                                <span className="mr-1">View My Sets</span>
                                <SetsIcon />
                            </span>
                        </Link>
                        <Link href="/create">
                            <span className="flex justify-center items-center ml-2 px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                                Create
                                <PlusIcon />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-green-600">
                        Account Setting
                    </h2>
                    <ul className="flex flex-col mt-2 font-semibold">
                        <li className="flex items-center my-1 text-red-600 cursor-pointer">
                            <Link href="/profile/delete">
                                <span className="flex items-center">
                                    <CrossIcon />
                                    Delete account
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </RequireAuth>
    );
};

export default ProfilePage;
