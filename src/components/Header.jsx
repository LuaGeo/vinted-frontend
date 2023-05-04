import { Link } from "react-router-dom";

const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted bleu" />
        </Link>

        {/* </Link> */}
        <div className="buttonsContainer">
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button className="sell">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
