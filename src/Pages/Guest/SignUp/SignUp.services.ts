import User from "./types/user";

const register = async (user: User) => {
  const data: Response = await fetch(
    "http://srv-dpi-proj-openstreetart22-test.univ-rouen.fr/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    }
  );
  return data;
};

export default register;
