import { createHashRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Error from "@/pages/Error";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    loader: () => {
      return {};
    },
  },
  { path: "/login", element: <Login /> },
]);

export default router;
