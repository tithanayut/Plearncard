import Head from "next/head";
import { Provider } from "next-auth/client";

import Layout from "../components/Layout";
import "../styles/globals.css";

function App({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Head>
                <title>Plearncard</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default App;
