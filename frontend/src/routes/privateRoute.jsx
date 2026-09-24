import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.js";

function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-black">Carregando...</p>;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />; // renderiza a rota filha que "casou" com a URL
}

export default PrivateRoute;
