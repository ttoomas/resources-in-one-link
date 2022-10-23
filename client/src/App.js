import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRes from "./pages/CreateRes";
import LoginRes from "./pages/LoginRes";
import UpdateRes from "./pages/UpdateRes";

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
      path: "/update/resources/:slug",
      element: <UpdateRes/>
    }
  ])

  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
