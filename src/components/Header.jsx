const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo vinted bleu" />
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
