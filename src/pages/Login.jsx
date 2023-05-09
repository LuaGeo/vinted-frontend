import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
            handleUserData({
              token: response.data.token,
              userId: response.data._id,
            });
            console.log(response.data._id);
            navigate("/publish");
          }
          // console.log(response.data);
        } catch (error) {
          if (error.message === "Request failed with status code 401") {
            setErrorMessage("Mot de passe incorrect");
          }
          // console.log(error.message);
          // console.log(error.response.data);
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;
