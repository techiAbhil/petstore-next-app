import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment } from 'react'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
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

            <Component {...pageProps} />
        </Fragment>
    )
}
