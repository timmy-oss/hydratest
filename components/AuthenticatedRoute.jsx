import { useState, useEffect, useContext } from "react";
import { loadSession } from "../lib/session";
import { context } from "../store/Provisioner";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "./Loader";

const LOGIN_URL = "/";

function AuthenticationPendingPage(props) {
  return (
    <div>
      <Head>
        <title> Checking... | {process.env.NEXT_PUBLIC_APP_NAME} </title>
      </Head>

      <main className="min-h-screen flex flex-col  justify-center items-center">
        <Loader />

        {/* <p className="font-bold text-xl"> Authenticating...</p> */}
      </main>
    </div>
  );
}

function verifyTokenWithServer(token) {
  return true;
}

function validateAuth(store, loadedSession = null, dispatch) {
  const { auth } = store;

  if (auth && auth.token) {
    //confirm token with server

    return verifyTokenWithServer(auth.token);
  }

  if (loadedSession && loadedSession.token) {
    //confirm token with server

    if (verifyTokenWithServer(loadedSession.token)) {
      dispatch({
        type: "SET_AUTH",
        payload: {
          ...loadedSession,
        },
      });
      return true;
    }
  }

  return false;
}

function AuthenticatedRoute({ RenderProp }) {
  const { store, dispatch } = useContext(context);
  const [authStage, setAuthStage] = useState("checking");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const loadedSession = loadSession();

    // console.log(loadSession());

    const v = validateAuth(store, loadedSession, dispatch);

    if (v) {
      setAuthStage("confirmed");
    } else {
      setAuthStage("failed");
    }
  }, [router.isReady]);

  if (authStage === "checking") {
    return <AuthenticationPendingPage />;
  }

  if (authStage === "confirmed") {
    return <RenderProp />;
  }

  if (authStage === "failed") {
    router.push(LOGIN_URL);
  }
}

export default AuthenticatedRoute;
