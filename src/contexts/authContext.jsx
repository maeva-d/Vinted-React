import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("connexion-token") || null);
  const [userId, setUserId] = useState(Cookies.get("user-id") || null);
  const [connectedUser, setConnectedUser] = useState(
    Cookies.get("connected-user") || null
  );

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

  // Pour que l'utilisateur puisse accéder à son profil, il faut connaître son user id

  const fetchUserId = (id) => {
    if (id !== null) {
      Cookies.set("user-id", id, { expires: 31 });
      setUserId(id);
    } else {
      Cookies.remove("user-id");
      setUserId(null);
    }
  };

  // Je veux récupérer le pseudo de l'utilisateur après connexion pour le garder affiché dans le header:
  const fetchUsername = (username) => {
    if (username !== null) {
      Cookies.set("connected-user", username, { expires: 31 });
      setConnectedUser(username);
    } else {
      Cookies.remove("connected-user");
      setConnectedUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        handleToken,
        userId,
        fetchUserId,
        connectedUser,
        fetchUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
