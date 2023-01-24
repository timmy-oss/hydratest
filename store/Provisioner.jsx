import { useReducer, useState, createContext, useEffect } from "react";
import authReducer from "./reducers/authReducer";
import { useRouter } from "next/router";
import RouterLoader from "../components/RouterLoader";
import { removeSession } from "../lib/session";

const initialState = {
  auth: {
    token: null,
    authExpCounter: 0,
  },
};

const LOGIN_URL = "/";

function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
  };
}

export const context = createContext(initialState);

function Provisioner(props) {
  const [store, dispatch] = useReducer(rootReducer, initialState);
  const router = useRouter();
  const [n, setN] = useState(false);
  const [showRouterLoader, setShowRouterLoader] = useState(false);

  // Log out function
  function logOut() {
    if (store.auth && store.auth.token && store.auth.user) {
      removeSession();
      dispatch({ type: "CLEAR_AUTH" });

      router.push(`${LOGIN_URL}?e=002&&n=${router.asPath}`);
    }
  }

  // Handle Route change start
  function routeStart(url) {
    setShowRouterLoader(true);
  }

  // Handle Route change end
  function routeEnd(url) {
    setShowRouterLoader(false);
  }

  // Router events

  useEffect(() => {
    router.events.on("routeChangeStart", routeStart);
    router.events.on("routeChangeComplete", routeEnd);

    return () => {
      router.events.off("routeChangeStart", routeStart);
      router.events.off("routeChangeComplete", routeEnd);
    };
  }, []);

  // Authentication Expiry Checker
  useEffect(() => {
    // console.log(store.auth);
    if (store.auth && store.auth.token && store.auth.user && store.auth.flags) {
      const authExpiry = store.auth.flags.exp * 1000;

      const t = setTimeout(() => {
        const now = Date.now();

        if (now >= authExpiry) {
          dispatch({
            type: "AUTH_EXP_COUNTER",
          });
        } else {
          setN(n + 1);
          // console.log(
          //   "Auth still valid, will expire in ",
          //   (authExpiry - now) / 1000,
          //   " seconds."
          // );
        }
      }, 5000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [n, store.auth, router.isReady]);

  return (
    <context.Provider value={{ store, dispatch, logOut }}>
      <RouterLoader active={showRouterLoader} />

      {props.children}
    </context.Provider>
  );
}

export default Provisioner;
