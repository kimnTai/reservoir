import { createHashRouter } from "react-router-dom";

import { isLoginApi } from "@/api";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    loader: async () => {
      const res = await isLoginApi();

      return { isLogin: res.data };
    },
  },
  { path: "/login", element: <Login /> },
]);

export default router;
