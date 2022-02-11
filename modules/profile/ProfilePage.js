import Link from "next/link";
import { useSession } from "next-auth/client";
import useFetch from "../../helpers/fetch/useFetch";
import RequireAuth from "../../helpers/auth/RequireAuth";
import { useTranslation } from "next-i18next";
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

    const { t } = useTranslation(["profile", "common"]);

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

            <div className="mx-auto mt-8 w-5/6 text-gray-600 lg:w-2/3">
                <div className="block items-center justify-between sm:flex">
                    <p>
                        {t("joined_since")} {joinedSince}
                    </p>
                    <div className="mt-4 flex sm:mt-0">
                        <Link href="/sets">
                            <span className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 text-gray-600 hover:bg-green-300 hover:shadow-sm">
                                {t("common:view_my_sets")}
                                <SetsIcon className="ml-1 h-5 w-5" />
                            </span>
                        </Link>
                        <Link href="/create">
                            <span className="ml-2 flex h-10 cursor-pointer items-center justify-center rounded-lg bg-green-200 px-4 text-gray-600 hover:bg-green-300 hover:shadow-sm">
                                {t("common:create")}
                                <PlusIcon className="h-5 w-5" />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-green-600">
                        {t("account_setting")}
                    </h2>
                    <ul className="mt-2 flex flex-col font-semibold">
                        <li className="my-1 flex cursor-pointer items-center text-red-600">
                            <Link href="/profile/delete">
                                <span className="flex items-center">
                                    <CrossIcon className="h-5 w-5" />
                                    {t("delete_account")}
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
