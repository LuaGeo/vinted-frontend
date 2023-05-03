import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages //
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";

// imgs //
import logo from "./assets/imgs/logo1.svg";
import hero from "./assets/imgs/banner-hero.jpg";

function App() {
  return (
    <Router>
      <Header logo={logo} />
      <Routes>
        <Route path="/" element={<Home hero={hero} />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
