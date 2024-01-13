const BASE_URL = "http://localhost:7001";

export const loginApi = async (data: { password: string }) => {
  const value = await fetch(BASE_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await value.json();
};
