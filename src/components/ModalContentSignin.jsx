import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalContent = ({ closeModal, handleToken, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const response = await axios.post(
        "https://site--marvel-backend--tvp4vjmpy6zn.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      console.log(response.data);

      handleToken(response.data.token);

      navigate("/");
    } catch (error) {
      console.log(error.response.data);

      if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
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
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <input type="submit" value="Submit" />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </article>
      </div>
    </>
  );
};
export default ModalContent;
