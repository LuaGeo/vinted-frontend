import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <form
      className="container formContainer"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/login",
            {
              email: email,
              password: password,
            }
          );
          if (response.data.token) {
            handleToken(response.data.token);
            navigate("/");
          }
          // console.log(response.data);
        } catch (error) {
          console.log(error.message);
          console.log(error.response.data);
        }
      }}
    >
      <h2>Se connecter</h2>
      <input
        type="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
        value={email}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;