import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginApi, loginApi } from "@/api";
import { useAppContext } from "@/context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useAppContext();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const res = await loginApi({ password });

    setMessage(res.message);
    setIsLogin(res.data);
  };

  useEffect(() => {
    if (isLogin) {
      navigate(`/`);
    } else {
      isLoginApi().then((res) => {
        console.log(res.data);
      });
    }
  }, [isLogin]);

  return (
    <div>
      <p className="fs-24 mb-8">Password:</p>
      <p className="fs-24 mb-8">{message}</p>
      <input
        className="fs-24 mb-8"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <div>
        <button className="fs-24" onClick={handleClick}>
          登入
        </button>
      </div>
    </div>
  );
}
