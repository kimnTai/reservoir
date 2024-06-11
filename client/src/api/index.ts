export const loginApi = async (data: { password: string }) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const isLoginApi = async () => {
  const res = await fetch("/api/isLogin", {
    method: "GET",
  });

  return await res.json();
};

export const logoutApi = async () => {
  const res = await fetch("/api/logout", {
    method: "GET",
  });

  return await res.json();
};
