import "./App.css";
// Etape 1 : J'instale react-router-dom, puis j'importe ses composants:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Etape 2 :J'importe toutes les pages que j'ai créees dans mon dossier page
//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// components
import Header from "./Components/Header";

// Etape 3 : J'utilise les composants que j'ai importés
function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
