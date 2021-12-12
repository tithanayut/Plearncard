import Head from "next/head";
import { Provider } from "next-auth/client";
import NextNProgress from "nextjs-progressbar";
import NavBar from "../modules/layout/NavBar/NavBar";

import "../styles/globals.css";

function App({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <NextNProgress color="#FFBF00" height={4} stopDelayMs={150} />
            <Head>
                <title>Plearncard</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <header>
                <NavBar />
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </Provider>
    );
}

export default App;
