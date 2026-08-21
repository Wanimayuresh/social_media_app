import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";
import AuthBootstrap from "./AuthBootstrap";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";
import { Toaster } from "@/components/ui/toast";

export function AppProviders() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <Toaster>
          <AuthBootstrap>
               <RouterProvider router={router} />
          </AuthBootstrap>
        </Toaster>
      </QueryProvider>
    </ReduxProvider>
  );
}