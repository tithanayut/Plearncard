import { useTranslation } from "next-i18next";
import ProfileWithBorderIcon from "../../../icons/ProfileWithBorderIcon";

const ProfileBanner = (props) => {
    if (!props.session) {
        return;
    }

    const { t } = useTranslation(["profile", "common"]);

    return (
        <div className="flex flex-col justify-center items-center h-32 bg-gray-100">
            <p className="text-lg text-gray-600 font-bold">
                {t("common:hello")},
            </p>
            <p className="flex items-center text-2xl text-gray-600 font-bold">
                <ProfileWithBorderIcon className="w-8 h-8 mr-2" />
                {props.session.user.name}
            </p>
        </div>
    );
};

export default ProfileBanner;
