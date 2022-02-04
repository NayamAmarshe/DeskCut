import Head from "next/head";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>DeskCut</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
