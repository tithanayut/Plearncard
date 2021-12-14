import SearchSetsPage from "../modules/sets/SearchSetsPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default SearchSetsPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sets"])),
        },
    };
}
