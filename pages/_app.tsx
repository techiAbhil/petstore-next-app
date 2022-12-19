import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';
import '../utils/interceptor';
export default function App({ Component, pageProps }: AppProps) {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }

    return (
        <Fragment>
            <Head>
                <title>Geneka Petstore</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400&display=swap"
                    rel="stylesheet"
                />

                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </Head>
            <Script src="https://kit.fontawesome.com/73ee72016e.js"></Script>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Fragment>
    );
}
