import { Link } from "react-router-dom";

import Offers from "../components/Offers";

const Home = ({ hero, data, ripHero }) => {
  return (
    <>
      <div className="hero">
        <img
          className="imgHero"
          src={hero}
          alt="couple qui range des vêtements sur un lit"
        />
        <img className="ripHero" src={ripHero} alt="partie de photo déchirée" />
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
