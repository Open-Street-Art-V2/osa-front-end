/* eslint-disable */
import { createContext, useCallback, useState } from "react";
import { User } from "../../Pages/Guest/SignIn/utils/types";
import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

type LoginContextType = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const LoginContext = createContext<LoginContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

function LoginCtxProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userHandler = useCallback((user: User | null) => {
    setUser(user);
  }, []);
  const isLoggedInHandler = (loginStatus: boolean) => {
    setIsLoggedIn(loginStatus);
  };
  return (
    <LoginContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser: userHandler,
        setIsLoggedIn: isLoggedInHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginCtxProvider;
