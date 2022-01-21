import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import * as gtag from "../components/gtag/gtag";
import NavBar from "../modules/layout/NavBar/NavBar";

import "../styles/globals.css";

function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <Provider session={pageProps.session}>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-S8RN3D3749"
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-S8RN3D3749', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />

            <NextNProgress
                color="#FFBF00"
                height={4}
                stopDelayMs={150}
                options={{ showSpinner: false }}
            />
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

export default appWithTranslation(App);
