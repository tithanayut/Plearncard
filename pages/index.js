import IndexPage from "../modules/staticpages/IndexPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default IndexPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "staticpages",
            ])),
        },
    };
}
