import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../middleware/Middleware";

const PrivateRoute = () => {
  // const {auth} = useContext(authCxt);
  const auth = isLogged();
  return auth ? <Outlet /> : <Navigate to="/ayala/in" />;
};

export default PrivateRoute;
