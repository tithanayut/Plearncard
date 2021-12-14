import AllSetsPage from "../../modules/sets/AllSetsPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default AllSetsPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sets"])),
        },
    };
}
