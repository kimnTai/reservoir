import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginApi } from "@/api";
import { useAppContext } from "@/context/AppContext";

export default function Login() {
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useAppContext();
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const res = await loginApi({ password });

    setIsLogin(res.data);
  };

  useEffect(() => {
    if (isLogin) {
      navigate(`/`);
    }
  }, [isLogin]);

  return (
    <div className="border-2 border-r-8 border-black shadow-2xl p-8">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <div className="flex flex-col text-xl my-6">
        <label className="mb-2">Password</label>
        <input
          className="border-2 border-black"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
      </div>

      <button
        className="bg-yellow-500 border-2 border-black text-xl py-2 w-full"
        onClick={handleClick}
      >
        登入
      </button>
    </div>
  );
}
