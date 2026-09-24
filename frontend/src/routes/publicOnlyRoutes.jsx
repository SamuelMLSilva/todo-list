import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.js";

function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

export default PublicOnlyRoute;
