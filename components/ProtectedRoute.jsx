import AuthenticatedRoute from "./AuthenticatedRoute";

function ProtectedRoute(props) {
  return () => {
    return <AuthenticatedRoute {...props} />;
  };
}

export default ProtectedRoute;
