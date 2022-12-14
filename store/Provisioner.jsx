import { useReducer, createContext } from "react";
import authReducer from "./reducers/authReducer";

const initialState = {
  auth: {
    token: null,
  },
};

function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
  };
}

export const context = createContext(initialState);

function Provisioner(props) {
  const [store, dispatch] = useReducer(rootReducer, initialState);

  return (
    <context.Provider value={{ store, dispatch }}>
      {props.children}
    </context.Provider>
  );
}

export default Provisioner;
