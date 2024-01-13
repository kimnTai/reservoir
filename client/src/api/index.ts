const BASE_URL = "http://localhost:7001";

export const loginApi = (data: { password: string }) => {
  return fetch(BASE_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((value) => value.json());
};
