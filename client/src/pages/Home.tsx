import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { logoutApi } from "@/api";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useAppContext();

  const loaderData = useLoaderData() as { isLogin: boolean };

  useEffect(() => {
    setIsLogin(loaderData.isLogin);

    if (!isLogin && !loaderData.isLogin) {
      navigate(`/login`);
    }
  }, [isLogin]);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <button
          className=" bg-black text-white px-4 py-2"
          onClick={async () => {
            const res = await logoutApi();

            setIsLogin(!res.data);

            navigate(`/login`);
          }}
        >
          退出
        </button>
      </div>
    </div>
  );
}
