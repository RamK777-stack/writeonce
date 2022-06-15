import "../src/assets/css/style.css"
import "../src/assets/css/custom.css"
import {Layout} from "../src/components/common/Layout"
import {Provider} from "react-redux"
import {store} from "../src/store"
import "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import Head from "next/head"

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Writeonce - dev news</title>
          <link rel="icon" href="/feather.ico" />
          <meta name="title" content="writeonce - blogging community" />
          <meta name="description" content="writeonce is a blogging community where one can easily start with writting using interactive editor inspired from notion" />
          <meta property="og:title" content="writeonce - blogging community" key="title" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
