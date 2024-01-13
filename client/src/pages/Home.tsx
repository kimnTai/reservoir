import { loginApi } from "@/api";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  return (
    <div>
      <p className="fs-24 mb-8">Password:</p>
      <input
        className="fs-24 mb-8"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <div>
        <button
          className="fs-24"
          onClick={async () => {
            const res = await loginApi({ password });

            console.log(res);
          }}
        >
          登入
        </button>
      </div>
    </div>
  );
}
