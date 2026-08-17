import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../guard/AuthGuard";
import Login from "@/features/auth/pages/Login";
import SignUp from "@/features/auth/pages/SignUp";


export const router =createBrowserRouter([
  {
    element: <AuthGuard requiresAuth={true} />,
    children: [
      { path: "/", element: <div>Home</div> },
      { path: "/profile", element: <div>profile</div> },
    ],
  },
  {
    element: <AuthGuard requiresAuth={false} />,
    children: [
      { path: "/login", element: <Login/>},
      { path: "/sign-up", element: <SignUp/> },
    ],
  },
]);