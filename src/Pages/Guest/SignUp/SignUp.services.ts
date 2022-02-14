import User from "./types/user";

const register = async (user: User) => {
  try {
    await fetch("http://localhost:3008/auth/register", {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default register;
