import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const infos = { email, username, password, newsletter };

  const register = async () => {
    try {
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        infos
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label htmlFor="email">Email : </label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        value={email}
        placeholder="email@email.com"
      />
      <label htmlFor="username">Username : </label>
      <input
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        value={username}
        placeholder="Toto"
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
      <button onClick={register} type="submit">
        Register
      </button>
    </form>
  );
};
export default Signup;
