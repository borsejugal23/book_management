import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [swap, setSwap] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const toggle = () => {
    setSwap((p) => !p);
  };

  const handleAuth = () => {
    setAuth((isAuth) => !isAuth);
  };
  return (
    <AuthContext.Provider value={{ swap, toggle, isAuth, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
