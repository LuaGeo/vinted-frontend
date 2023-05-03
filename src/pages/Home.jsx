import { Link } from "react-router-dom";

const Home = ({ hero }) => {
  return (
    <>
      <div className="hero">
        <img src={hero} alt="" />
      </div>
      <main>
        <h1>Je suis sur la HOME</h1>
        <Link to="/offer">Naviguer vers Offer</Link>
      </main>
    </>
  );
};

export default Home;
