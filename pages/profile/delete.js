import DeleteProfilePage from "../../modules/profile/DeleteProfilePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default DeleteProfilePage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "profile"])),
        },
    };
}
