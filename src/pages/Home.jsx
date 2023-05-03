import { Link } from "react-router-dom";

import Offers from "../components/Offers";

const Home = ({ hero, data, offer, setOffers }) => {
  return (
    <>
      <div className="hero">
        <img src={hero} alt="couple qui range des vêtements sur un lit" />
      </div>
      <main>
        <div className="offersContainer container">
          {data.offers.map((offer) => {
            return <Offers key={offer._id} offer={offer} />;
          })}
        </div>
        <h1>Je suis sur la HOME</h1>
        <Link to="/offer">Naviguer ver offer</Link>
      </main>
    </>
  );
};

export default Home;
