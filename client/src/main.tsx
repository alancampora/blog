import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import Singup from "./pages/singup/index.tsx";
import { AuthProvider } from "./context/auth.tsx";
import Landing from "./pages/landing/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Singup />,
  },
]);

createRoot(document.getElementById("root")!).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </GoogleOAuthProvider>
);
