import "../src/assets/css/style.css"
import "../src/assets/css/custom.css"
import {Layout} from "../src/components/common/Layout"
import {Provider} from "react-redux"
import {store} from "../src/store"
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
