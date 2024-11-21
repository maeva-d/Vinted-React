import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("connexion-token") || null);

  // Avec un token, je peux le stocker dans les cookies pour rester connecté.
  // Je passe le token à null pour me déconnecter : ainsi il sera retiré des cookies
  const handleToken = (token) => {
    if (token !== null) {
      Cookies.set("connexion-token", token, { expires: 31 });
      setToken(token);
    } else {
      Cookies.remove("connexion-token");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, handleToken }}>
      {children}
    </AuthContext.Provider>
  );
};
