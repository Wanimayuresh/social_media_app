import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./App.css";
import { Button } from "./components/ui/button";
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Button>Hello</Button>
    </>
  );
}

export default App;
