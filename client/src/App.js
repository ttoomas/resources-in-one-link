import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRes from "./pages/CreateRes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateRes/>
    }
  ])

  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
