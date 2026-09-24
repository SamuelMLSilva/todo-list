import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import RootLayout from "./layouts/RootLayout";
import PublicOnlyRoute from "./routes/publicOnlyRoutes.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";
import Profile from "./pages/Profile.jsx";

import { AuthProvider } from "./contexts/authContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <PrivateRoute />, // rota "pai" sem path — só faz a checagem
    children: [
      {
        element: <RootLayout />, // 2º nível: navbar + Outlet
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/tasks/:id", element: <TaskDetail /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
