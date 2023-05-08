import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

//import cookies ici

// components //

import Header from "./components/Header";

// pages //
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";

// imgs //
import logo from "./assets/imgs/logo1.svg";
import hero from "./assets/imgs/banner-hero.jpg";
import ripHero from "./assets/imgs/rip-hero.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);

  const [offers, setOffers] = useState([]);

  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("vinted-token", token, { expires: 7 });
    } else {
      setToken(null); // pk?
      Cookies.remove("vinted-token");
    }
  };

  // il a mis le fetchData dans Home

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <Router>
      <Header
        logo={logo}
        handleToken={handleToken}
        token={token}
        search={search}
        setSearch={setSearch}
      />
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
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
