import LoginPage from "../modules/staticpages/LoginPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default LoginPage;

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
