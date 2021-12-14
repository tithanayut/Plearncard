import SetsIndexPage from "../modules/sets/SetsIndexPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default SetsIndexPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sets"])),
        },
    };
}
