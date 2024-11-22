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
  // Création d'un state et d'une fonction mettre à jour le state

  const fetchUserId = (id) => {
    Cookies.set("user-id", id, { expire: 31 });
    setUserId(id);
  };

  // Je veux récupérer le pseudo de l'utilisateur après connexion pour le garder affiché dans le header:
  const fetchUsername = (username) => {
    Cookies.set("connected-user", username, { expire: 31 });
    setConnectedUser(username);
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
