import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//import cookies ici

const Header = ({ logo, handleToken, token, search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted bleu" />
        </Link>
        <input
          type="text"
          placeholder="Rechercher des articles ..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <div className="buttonsContainer">
          {token ? (
            <button
              onClick={() => {
                handleToken(null);
                navigate("/"); //comment ça marche?
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div className="buttonsConnection">
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>

              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </div>
          )}

          {token ? (
            <Link to="/publish">
              <button className="sellButton">Vends tes articles</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="sellButton">Vends tes articles</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
