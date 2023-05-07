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
          <div className="buttonsConnection">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>

            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
          <button className="sellButton">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
