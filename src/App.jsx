import "./App.css";
// Etape 1 : J'instale react-router-dom, puis j'importe ses composants:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Etape 2 :J'importe toutes les pages que j'ai créees dans mon dossier page
//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// components
import Header from "./Components/Header";

// Etape 3 : J'utilise les composants que j'ai importés
function App() {
  const [token, setToken] = useState(Cookies.get("connexion-token") || null);
  // search et setSearch sont dans App car je ne peux pas mettre dans header et ensuite remonter à Home: je les mets dans l'ancêtre commun le plus proche
  const [search, setSearch] = useState("");

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
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={<Home token={token} handleToken={handleToken} />}
        />
        <Route
          path="/offers/:id"
          element={<Offer token={token} handleToken={handleToken} />}
        />
        <Route
          path="/signup"
          element={<Signup token={token} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} handleToken={handleToken} />}
        />
        <Route
          path="/publish"
          element={<Publish token={token} handleToken={handleToken} />}
        />
        <Route
          path="/payment"
          element={<Payment token={token} handleToken={handleToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
