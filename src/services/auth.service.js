const AUTH_LS_KEY = "auth";

export const login = async ({ username, password }) => {
  if (username === "test@example.com" && password === "123456") {
    localStorage.setItem(AUTH_LS_KEY, "faketoken");
    return {
      username: "test@example.com",
      name: "your name",
    };
  } else {
    throw new Error("Wrong Username or Password");
  }
};

export const logout = async () => {
  localStorage.removeItem(AUTH_LS_KEY);
};

export const getUserInfo = async () => {
  const token = localStorage.getItem(AUTH_LS_KEY);
  if (token === null) {
    throw new Error("Login required");
  } else {
    return {
      username: "test@example.com",
      name: "your name",
    };
  }
};
