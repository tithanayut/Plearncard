import Head from "next/head";
import { Provider } from "next-auth/client";
import NavBar from "../modules/layout/NavBar/NavBar";

import "../styles/globals.css";

function App({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
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
