import { createHashRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const router = createHashRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
]);

export default router;
