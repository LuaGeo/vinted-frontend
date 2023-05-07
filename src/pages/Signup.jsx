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
    <form className="container" onSubmit={handleSubmit}>
      <label htmlFor="username">Username : </label>
      <input
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        value={username}
        placeholder="Toto"
      />
      <label htmlFor="email">Email : </label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        value={email}
        placeholder="email@email.com"
      />
      <label htmlFor="password">Password : </label>
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        value={password}
        placeholder="********"
      />
      <label htmlFor="newsletter">Newsletter : </label>
      <input
        onChange={() => setNewsLetter(!newsletter)}
        type="checkbox"
        value={newsletter}
      />
      <button type="submit">Register</button>
    </form>
  );
};
export default Signup;
