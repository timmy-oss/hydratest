import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="HydraTest is the ultimate test." />
        <meta name="author" content="Timileyin Pelumi" />
        <meta
          name="theme-color"
          content="#5522A9"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#5522A9"
          media="(prefers-color-scheme: dark)"
        />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="apple-touch-icon" href="/assets/hydratest.png"></link>
        <link rel="icon" href="/favicon.ico"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
        ></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Mulish:wght@400;700;900&family=Roboto:wght@400;700;900&family=Work+Sans:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
