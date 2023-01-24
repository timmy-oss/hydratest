import { useEffect, useContext, useReducer, useMemo } from "react";
import { loadSession, removeSession } from "../lib/session";
import { context } from "../store/Provisioner";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { RpcRequest } from "../lib/rpc";
import Header from "../components/Header";

const LOGIN_URL = "/";

function AuthenticationPendingPage(props) {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <main className="min-h-screen flex flex-col  justify-center items-center">
        <Header />
        <Loader />

        <p className="text-black/40 text-sm text-center"> Working...</p>
      </main>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "set_auth_status":
      return { ...state, status: action.payload.status };

    case "set_auth_error_status":
      return { ...state, errorStatus: action.payload.errorStatus };

    default:
      return state;
  }
}

const initState = {
  auth: null,
  status: "checking",
  errorStatus: null,
};

async function serverCheck(token) {
  const res = await RpcRequest("users.authenticated", {
    req: {
      auth: {
        token,
      },

      body: null,
    },
  });

  if (!res.success) {
    return {
      success: false,
      status: res.status,
      msg: res.error.message,
    };
  }

  return {
    success: true,
    status: res.status,
    data: res.data,
  };
}

async function checkAuthValidity(auth, isLocal = false) {
  if (!(auth && auth.token)) {
    return false;
  }

  const res = await serverCheck(auth.token);

  // console.log(" Auth Req: ", res);

  if (res.success) {
    return {
      token: auth.token,
      user: res.data.user,
      success: true,
    };
  } else {
    if (isLocal) {
      removeSession();
    }

    return {
      success: false,
      errorStatus: res.status,
    };
  }
}

async function authenticationChecker(appAuth, dispatch) {
  const localAuth = loadSession();

  if (appAuth) {
    const authInfo = await checkAuthValidity(appAuth);

    if (authInfo.success) {
      // console.log("App Auth Passed");

      dispatch({
        type: "SET_AUTH",
        payload: {
          token: authInfo.token,
          user: authInfo.user,
        },
      });

      return {
        success: true,
        errrorStatus: null,
      };
    }
  }

  if (localAuth) {
    const authInfo = await checkAuthValidity(localAuth, true);

    if (authInfo.success) {
      // console.log("Local Auth Passed");

      dispatch({
        type: "SET_AUTH",
        payload: {
          token: authInfo.token,
          user: authInfo.user,
          flags: localAuth.flags,
        },
      });

      return {
        success: true,
        errrorStatus: null,
      };
    }
  }

  // console.log("No Auth Passed");

  return {
    success: false,
    errrorStatus: null,
  };
}

export default function SecureRoute({ RenderProp, skipLogin, ...props }) {
  const router = useRouter();
  const { store, dispatch } = useContext(context);
  const [_state, _dispatch] = useReducer(reducer, initState);
  const { n: redirectTo = "" } = router.query;

  async function pipeline() {
    const result = await authenticationChecker(store.auth, dispatch);

    if (result.success) {
      _dispatch({ type: "set_auth_status", payload: { status: "confirmed" } });
    } else {
      _dispatch({ type: "set_auth_status", payload: { status: "invalid" } });
      _dispatch({
        type: "set_auth_error_status",
        payload: { errorStatus: 400 },
      });
    }
  }

  // UseEffect Call for pipeline

  useEffect(() => {
    if (!router.isReady) return;
    pipeline();
  }, [router.isReady]);

  // Render Logic

  if (
    _state.status === "checking" ||
    (_state.status === "confirmed" && !(store.auth && store.auth.user))
  )
    return <AuthenticationPendingPage />;

  if (_state.status === "confirmed" && store.auth && store.auth.user) {
    if (skipLogin) {
      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        router.replace("/portal");
      }
    } else {
      return <RenderProp auth={store.auth} />;
    }
  }

  if (_state.status === "invalid") {
    if (router.pathname === LOGIN_URL) {
      return <RenderProp />;
    } else {
      router.push(`${LOGIN_URL}?e=001&n=${router.asPath}`);
    }
  }
}
