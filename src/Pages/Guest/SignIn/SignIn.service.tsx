/* eslint-disable */
import { User } from "./utils/types";

export const login = async (
  setIsLoading: any,
  setUnauthorizedError: any,
  creds: { email: string | undefined; password: string | undefined },
  setUser: (user: User | null) => void,
  setIsLoggedIn: (loggedIn: boolean) => void
) => {
  setIsLoading(true);
  try {
    const data: Response = await fetch(
      "http://srv-dpi-proj-openstreetart22-test.univ-rouen.fr/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: creds.email,
          password: creds.password,
        }),
        headers: {
          "Content-type": "Application/json",
        },
      }
    );
    if (data.ok) {
      const jsonData = await data.json();
      localStorage.setItem("jwt", jsonData.jwt);
      localStorage.setItem("user", JSON.stringify({ ...jsonData.user }));
      setUser({ ...jsonData.user, jwt: jsonData.jwt });
      setIsLoggedIn(true);
    } else if (data.status == 401 || data.status == 404) {
      setUnauthorizedError(true);
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
      // return "Password must be at least 8 characters long";
      return "Minimum 8 caractères";
    case "max":
      // return "Password maximum length is 25 characters";
      return "Maximum 25 caractères";
    case "digits":
      // return "Password must contain at least one digit";
      return "Doit contenir au moins un chiffre";
    case "lowercase":
      // return "Password must contain at least one lowercase character";
      return "Doit contenir au moins un caractère en minuscule";
    case "uppercase":
      // return "Password must contain at least one uppercase character";
      return "Doit contenir au moins un caractère en majuscule";
    case "spaces":
      // return "Password must not contain spaces";
      return "Ne doit pas contenir d'espaces";
    default:
      // return "Wrong password format";
      return "Mot de passe incorrecte";
  }
};

// min, uppercase, digits, max, lowercase, spaces
