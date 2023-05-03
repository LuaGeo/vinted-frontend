import { Link } from "react-router-dom";

const Home = ({ hero }) => {
  return (
    <div>
      <hero>
        <img src={hero} alt="" />
      </hero>
      <main>
        <h1>Je suis sur la HOME</h1>
        <Link to="/offer">Naviguer vers Offer</Link>
      </main>
    </div>
  );
};

export default Home;
