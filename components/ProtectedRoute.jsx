import AuthenticatedRoute from "./AuthenticatedRoute";
import SecureRoute from "./SecureRoute";

function ProtectedRoute(props) {
  return () => {
    return <SecureRoute {...props} />;
  };
}

export default ProtectedRoute;
