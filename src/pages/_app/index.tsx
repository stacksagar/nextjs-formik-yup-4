import './globals.css';
import 'nprogress/nprogress.css';
import Header from 'components/Header';
import Router from 'next/router';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function _app({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <footer className="p-40 bg-gray-900 text-white">
        <h1 className="text-4xl">Footer</h1>
      </footer>
    </>
  );
}
