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
        <div>
          <h1>Prêts à faire du tri dans vos placards?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <main>
        <div className="offersContainer container">
          {data.offers.map((offer) => {
            return <Offers key={offer._id} offer={offer} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
