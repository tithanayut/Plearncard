import { useTranslation } from "next-i18next";
import ProfileWithBorderIcon from "../../../icons/ProfileWithBorderIcon";

const ProfileBanner = (props) => {
    if (!props.session) {
        return;
    }

    const { t } = useTranslation(["profile", "common"]);

    return (
        <div className="flex h-32 flex-col items-center justify-center bg-gray-100">
            <p className="text-lg font-bold text-gray-600">
                {t("common:hello")},
            </p>
            <p className="flex items-center text-2xl font-bold text-gray-600">
                <ProfileWithBorderIcon className="mr-2 h-8 w-8" />
                {props.session.user.name}
            </p>
        </div>
    );
};

export default ProfileBanner;
