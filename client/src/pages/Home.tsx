import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isLogin } = useAppContext();

  useEffect(() => {
    if (!isLogin) {
      navigate(`/login`);
    }
  }, [isLogin]);

  return <div>Home</div>;
}
