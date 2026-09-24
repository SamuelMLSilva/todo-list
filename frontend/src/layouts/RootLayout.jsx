import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";

function RootLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
