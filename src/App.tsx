import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./App.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    // Keep Tailwind/ShadCN dark mode working by toggling the `.dark` class on <html>.
    // (Your CSS switches `--background` based on `.dark`.)
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const next = mql.matches;
      document.documentElement.classList.toggle("dark", next);
    };

    apply();
    // React to OS theme changes while the app is open.
    mql.addEventListener?.("change", apply);

    return () => {
      mql.removeEventListener?.("change", apply);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
