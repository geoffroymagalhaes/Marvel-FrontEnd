import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalContent = ({ closeModal, token, handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--tvp4vjmpy6zn.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div onClick={closeModal} className="modalBackground"></div>
      <div className="modalContent">
        <button className="Xbutton" onClick={closeModal}>
          x
        </button>
        <article>
          <form className="formLogin" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <h3>Email</h3>
            <input
              type="email"
              placeholder="Adresse email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input type="submit" value="Se connecter" />
          </form>
        </article>
      </div>
    </>
  );
};
export default ModalContent;
