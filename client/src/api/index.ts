const BASE_URL = "http://localhost:7001";

export const loginApi = async (data: { password: string }) => {
  const res = await fetch(BASE_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const isLoginApi = async () => {
  const res = await fetch(BASE_URL + "/api/isLogin", {
    method: "GET",
  });

  return await res.json();
};
