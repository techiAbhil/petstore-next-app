import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import Layout from '../components/layout/layout'

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
        <script src="https://kit.fontawesome.com/73ee72016e.js"></script>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}
