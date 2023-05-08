import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let infos = { email, username, password, newsletter };
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        infos
      );
      if (response.data.token) {
        console.log(response.data.token);
        //save token here
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage(
          "Cet e-mail est déjà utilisé, veuillez en choisir un autre ^^"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
      // console.log(error.message);
      // console.log(error.response.data);
      // pour savoir la reponse du serveur en cas d'erreur (definie dans le backend)
      // il faut mettre error.response.data
    }
  };

  //mettre le try catch de register ici et ajouter handlesubmit dans la balise form (au lieu de dans le button)

  return (
    <div>
      <form className="container formContainer" onSubmit={handleSubmit}>
        <h2>S'inscrire</h2>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          value={username}
          placeholder="Nom d'utilisateur"
        />
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
          placeholder="Email"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
          placeholder="Mot de passe"
        />
        <div>
          <div className="checkboxContainer">
            <input
              className="checkbox"
              onChange={() => setNewsLetter(!newsletter)}
              type="checkbox"
              value={newsletter}
            />
            <label htmlFor="newsletter">S'inscrire à notre newsletter </label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button className="buttonsPages" type="submit">
          S'inscrire
        </button>
      </form>
      {errorMessage && (
        <p className="container" style={{ color: "red", width: "100" }}>
          {" "}
          //refaire dans App.css
          {errorMessage}
        </p>
      )}
      <Link to="/login" className="container">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};
export default Signup;
