import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRes from "./pages/CreateRes";
import LoginRes from "./pages/LoginRes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateRes/>
    },
    {
      path: "/login",
      element: <LoginRes/>
    }
  ])

  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
