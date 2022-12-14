export default function (state, action) {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        ...action.payload,
      };

      break;

    default:
      return state;
  }
}
