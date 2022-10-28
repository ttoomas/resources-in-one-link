import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRes from "./pages/CreateRes";
import CustomError from "./pages/CustomError";
import LoginRes from "./pages/LoginRes";
import UpdateRes from "./pages/UpdateRes";
import ViewRes from "./pages/ViewRes";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <CustomError/>
    },
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
    },
    {
      path: "/resources/:slug",
      element: <ViewRes/>
    },
  ])

  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
