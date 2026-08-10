import type { PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}