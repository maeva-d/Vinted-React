import { AuthProvider } from "./contexts/authContext.jsx";
import { useState } from "react";
// Etape 1 : J'instale react-router-dom, puis j'importe ses composants:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Etape 2 :J'importe toutes les pages que j'ai créees dans mon dossier pages
import Home from "./pages/home-page/Home";
import Auth from "./pages/auth-page/Auth";
import Offer from "./pages/offer-page/Offer";
import Profile from "./pages/profile-page/Profile.jsx";
import Publish from "./pages/publish-offer-page/Publish";
import Payment from "./pages/Payment";

// components
import Header from "./Components/Header-Components/Header/Header.jsx";

// Etape 3 : J'utilise les composants que j'ai importés
function App() {
  // search et setSearch sont dans App car je ne peux pas mettre dans header et ensuite remonter à Home: je les mets dans l'ancêtre commun le plus proche
  const [search, setSearch] = useState("");

  return (
    <AuthProvider>
      <Router>
        <Header search={search} setSearch={setSearch}></Header>
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/authentification" element={<Auth />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user/:id" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
