/* eslint-disable */
import { User } from "./types";

export const login = async (
  setIsLoading: any,
  creds: { email: string | undefined; password: string | undefined },
  setUser: (user: User | null) => void,
  setIsLoggedIn: (loggedIn: boolean) => void
) => {
  setIsLoading(true);
  try {
    const data: Response = await fetch("http://localhost:3008/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: creds.email,
        password: creds.password,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    });
    if (data.ok) {
      const jsonData = await data.json();
      localStorage.setItem("jwt", jsonData.jwt);
      localStorage.setItem("user", JSON.stringify(jsonData.user));
      setUser(jsonData.user);
      setIsLoggedIn(true);
    } else if (data.status > 299) {
      console.log(data.status);
    }
  } catch (error) {
    console.log(error);
  }
  setIsLoading(false);
};

export const logout = (
  setUser: (user: User | null) => void,
  setIsLoggedIn: (loggedIn: boolean) => void
) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  setUser(null);
  setIsLoggedIn(false);
};

export const displayPasswordError = (errors: string[]) => {
  switch (errors[0]) {
    case "min":
      return "Password must be at least 8 characters long";
    case "max":
      return "Password maximum length is 25 characters";
    case "digits":
      return "Password must contain at least one digit";
    case "lowercase":
      return "Password must contain at least one lowercase character";
    case "uppercase":
      return "Password must contain at least one uppercase character";
    case "spaces":
      return "Password must not contain spaces";
    default:
      return "Wrong password format";
  }
};

// min, uppercase, digits, max, lowercase, spaces
