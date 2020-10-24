import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import {Provider} from "react-redux";
import store from "../redux/store";

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>

}

export default MyApp
