import User from "./types/user";

const register = async (user: User) => {
  const data: Response = await fetch("http://localhost:3008/auth/register", {
    method: "POST",
    body: JSON.stringify({
      ...user,
    }),
    headers: {
      "Content-type": "Application/json",
    },
  });
  return data;
};

export default register;
