import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);

  const navigate = useNavigate();

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("vinted-token", token, { expires: 7 });
    } else {
      setToken(null); // pk?
      Cookies.remove("vinted-token");
    }
  };

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
      console.log(error.message);
      console.log(error.response.data);
      // pour savoir la reponse du serveur en cas d'erreur (definie dans le backend)
      // il faut mettre error.response.data
    }
  };

  //mettre le try catch de register ici et ajouter handlesubmit dans la balise form (au lieu de dans le button)

  return (
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
  );
};
export default Signup;
