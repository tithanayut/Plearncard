import ProfilePage from "../../modules/profile/ProfilePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ProfilePage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "profile"])),
        },
    };
}
