import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.js";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar w-20 bg-gray-600">
      <Link to="/dashboard">Minhas Tarefas</Link>
      <Link to="/profile">Perfil</Link>

      <span>Olá, {user?.nome}</span>
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
}

export default Navbar;
