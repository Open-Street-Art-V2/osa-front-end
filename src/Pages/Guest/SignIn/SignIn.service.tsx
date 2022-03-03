/* eslint-disable */
import { User } from "./utils/types";
import { useTranslation } from "react-i18next";

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
      `${process.env.REACT_APP_API}/auth/login`,
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
  const { t, i18n } = useTranslation();
  switch (errors[0]) {
    case "min":
      // return "Password must be at least 8 characters long";
      return t("min.characters");
    case "max":
      // return "Password maximum length is 25 characters";
      return t("max.characters");
    case "digits":
      // return "Password must contain at least one digit";
      return t("digit.contain");
    case "lowercase":
      // return "Password must contain at least one lowercase character";
      return t("lowercase.character");
    case "uppercase":
      // return "Password must contain at least one uppercase character";
      return t("upercase.character");
    case "spaces":
      // return "Password must not contain spaces";
      return t("contain.spaces");
    default:
      // return "Wrong password format";
      return t("imdp");
  }
};

// min, uppercase, digits, max, lowercase, spaces
