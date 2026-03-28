import { createBrowserRouter } from "react-router-dom";
import Home from "../root/pages/home";
import AuthLayout from "../auth/auth-layout";
import SignInForm from "../auth/forms/sign-in-form";
import SignUpForm from "../auth/forms/sign-up-form";
import RootLayout from "../root/RootLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignInForm /> },
      { path: "sign-up", element: <SignUpForm /> },
    ],
  },
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "sign-up", element: <SignUpForm /> },
    ],
  },
]);
