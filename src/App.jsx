import "./App.css";

// Etape 1 : J'instale react-router-dom, puis j'importe ses composants:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Etape 3 :J'importe toutes les pages que j'ai créees dans mon dossier page
//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// components
import Header from "./Components/Header";

// Etape 2 : J'utilise les composants que j'ai importés
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header></Header>
      <Routes>
        {/* Ici il y aura toutes les pages de mon site */}
        <Route path="/" element={<Home />} />
        <Route path="Offer" element={<Offer />} />
      </Routes>
      <footer>Au revoir</footer>
    </Router>
  );
}

export default App;
