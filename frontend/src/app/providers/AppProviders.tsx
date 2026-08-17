import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";
import AuthBootstrap from "./AuthBootstrap";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";

export function AppProviders() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AuthBootstrap>
             <RouterProvider router={router} />
        </AuthBootstrap>
      </QueryProvider>
    </ReduxProvider>
  );
}