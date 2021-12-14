import ViewSetPage from "../../../modules/sets/ViewSetPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ViewSetPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sets"])),
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
