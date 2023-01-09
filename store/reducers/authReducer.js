export default function (state, action) {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        ...action.payload,
      };

      break;

    case "CLEAR_AUTH":
      return {
        ...state,
        token: null,
        user: null,
        flags: null,
      };

      break;

    case "AUTH_EXP_COUNTER":
      return {
        ...state,
        authExpCounter: state.authExpCounter + 1,
      };

      break;

    default:
      return state;
  }
}
