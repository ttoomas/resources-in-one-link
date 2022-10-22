import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRes from "./pages/CreateRes";
import LoginRes from "./pages/LoginRes";
import Resources from "./pages/Resources";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateRes/>
    },
    {
      path: "/login",
      element: <LoginRes/>
    },
    {
      path: "/resources/:slug",
      element: <Resources/>
    }
  ])

  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
