import { Link } from "react-router-dom";

//import cookies ici

const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted bleu" />
        </Link>

        {/* </Link> */}
        <div className="buttonsContainer">
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>

          <button>Se connecter</button>
          <button className="sell">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
