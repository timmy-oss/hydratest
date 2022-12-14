import "../styles/globals.css";
import type { AppProps } from "next/app";
import Provisioner from "../store/Provisioner";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provisioner>
      <Component {...pageProps} />
    </Provisioner>
  );
}

export default MyApp;
