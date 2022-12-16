import { useState, useEffect, useContext } from "react";
import { loadSession } from "../lib/session";
import { context } from "../store/Provisioner";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { RpcRequest } from "../lib/rpc";

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

async function verifyTokenWithServer(token) {
  const res = await RpcRequest("users.authenticated", {
    req: {
      auth: {
        token,
      },

      body: {},
    },
  });

  if (!res.success) {
    return {
      success: false,
      msg: res.error.message,
    };
  }

  return {
    success: true,
    data: res.data,
  };
}

async function validateAuth(store, loadedSession = null, dispatch) {
  const { auth } = store;

  if (auth && auth.token) {
    //confirm token with server

    const tokenInfo = await verifyTokenWithServer(auth.token);

    // console.log(tokenInfo);

    if (tokenInfo.success) {
      dispatch({
        type: "SET_AUTH",
        payload: {
          token: auth.token,
          user: tokenInfo.data.user,
        },
      });

      return {
        token: auth.token,
        user: tokenInfo.data.user,
      };
    }
  }

  if (loadedSession && loadedSession.token) {
    //confirm token with server

    const tokenInfo = await verifyTokenWithServer(loadedSession.token);

    // console.log(tokenInfo);

    if (tokenInfo.success) {
      dispatch({
        type: "SET_AUTH",
        payload: {
          token: loadedSession.token,
          user: tokenInfo.data.user,
        },
      });

      return {
        token: loadedSession.token,
        user: tokenInfo.data.user,
      };
    }
  }

  return false;
}

function AuthenticatedRoute({ RenderProp, skipLogin = false }) {
  const { store, dispatch } = useContext(context);
  const [authStage, setAuthStage] = useState("checking");
  const router = useRouter();
  const [auth, setAuth] = useState(null);

  async function authPipeline() {
    const loadedSession = loadSession();

    // console.log(loadSession());

    const v = await validateAuth(store, loadedSession, dispatch);

    setAuth(v);

    if (v) {
      setAuthStage("confirmed");
    } else {
      setAuthStage("failed");
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    authPipeline();
  }, [router.isReady]);

  if (authStage === "checking") {
    return <AuthenticationPendingPage />;
  }

  if (authStage === "confirmed" && auth) {
    if (skipLogin) {
      router.replace("/portal/courses");
    } else {
      return <RenderProp auth={auth} />;
    }
  }

  if (authStage === "failed") {
    if (router.pathname === LOGIN_URL) {
      return <RenderProp />;
    } else {
      router.push(`${LOGIN_URL}?e=001&n=${router.pathname}`);
    }
  }
}

export default AuthenticatedRoute;
