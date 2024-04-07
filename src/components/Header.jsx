// ---import-packages
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// ---import-img-video--
import Logo from "../assets/img/Logo.png";
import Video from "../assets/video/video.mp4";

// ---import-components--
import ModalButtonLogin from "./ModalButtonLogin";
import ModalButtonSignin from "./ModalButtonSignin";

const Header = () => {
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("marvel-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("marvel-token");
      setToken(null);
    }
  };
  return (
    <section>
      <header className="header">
        <div className="video-container">
          <video autoPlay loop muted>
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="header-content">
          <div className="headerLogo">
            <img src={Logo} alt="" />
          </div>
        </div>
      </header>

      <div className="headerLink">
        <ModalButtonLogin handleToken={handleToken} token={token} />
        <Link to={"/comics"}>
          <button>COMICS</button>
        </Link>
        <Link to={"/"}>
          <button>CHARACTERS</button>
        </Link>
        <Link to={"/favorites"}>
          <button>FAVORITES</button>
        </Link>
        <ModalButtonSignin handleToken={handleToken} token={token} />
      </div>
    </section>
  );
};
export default Header;
