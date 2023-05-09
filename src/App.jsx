import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//import cookies ici

// components //

import Header from "./components/Header";

// pages //
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// imgs //
import logo from "./assets/imgs/logo1.svg";
import hero from "./assets/imgs/banner-hero.jpg";
import ripHero from "./assets/imgs/rip-hero.svg";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const [userId, setUserId] = useState(Cookies.get("vinted-user-id") || null);

  const [offers, setOffers] = useState([]);

  const [search, setSearch] = useState("");

  const handleUserData = (userData) => {
    if (userData && userData.token && userData.userId) {
      const { token, userId } = userData;
      setToken(token);
      setUserId(userId);
      Cookies.set("vinted-token", token, { expires: 7 });
      Cookies.set("vinted-user-id", userId, { expires: 7 });
    } else {
      setToken(null);
      setUserId(null);
      Cookies.remove("vinted-token");
      Cookies.remove("vinted-user-id");
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
        handleUserData={handleUserData}
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
        <Route
          path="/signup"
          element={<Signup handleUserData={handleUserData} />}
        />
        <Route
          path="/login"
          element={<Login handleUserData={handleUserData} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment userId={userId} />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
