import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

//import cookies ici

// components //

import Header from "./components/Header";

// pages //
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// imgs //
import logo from "./assets/imgs/logo1.svg";
import hero from "./assets/imgs/banner-hero.jpg";
import ripHero from "./assets/imgs/rip-hero.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [offers, setOffers] = useState([]);

  // const [token ici...]
  // + handleTOken
  //chercher où il a mis le fetchdata etc qui sont ci-dessous :

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <Router>
      <Header logo={logo} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              hero={hero}
              data={data}
              offers={offers}
              setOffers={setOffers}
              ripHero={ripHero}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer data={data} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
