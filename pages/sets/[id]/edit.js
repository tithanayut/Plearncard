import EditSetPage from "../../../modules/sets/EditSetPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default EditSetPage;

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
