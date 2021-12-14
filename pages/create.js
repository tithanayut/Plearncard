import CreateSetPage from "../modules/sets/CreateSetPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default CreateSetPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sets"])),
        },
    };
}
