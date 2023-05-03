import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// components //

import Header from "./components/Header";

// pages //
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// imgs //
import logo from "./assets/imgs/logo1.svg";
import hero from "./assets/imgs/banner-hero.jpg";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [offers, setOffers] = useState([]);

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
            />
          }
        />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
