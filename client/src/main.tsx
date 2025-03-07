import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import Singup from "./pages/singup/index.tsx";
import { AuthProvider } from "./context/auth.tsx";
import Landing from "./pages/landing/index.tsx";
import Profile from "./pages/profile/index.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import NewPost from "./pages/posts/new/index.tsx";
import { RuntimeHome } from "./runtime-pages/home/index.tsx";
import RuntimePost from "./runtime-pages/post/index.tsx";
import ConfigHome from "./pages/config/home/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/config",
    element: (
      <ProtectedRoute>
        <ConfigHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Singup />,
  },
  {
    path: "/posts/edit/:postId",
    element: (
      <ProtectedRoute>
        <NewPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:blogId",
    element: (
      <RuntimeHome />
    ),
  },
  {
    path: "/:blogId/:postId",
    element: (
      <RuntimePost />
    ),
  },

]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </GoogleOAuthProvider>,
);
