import Logo from "../assets/img/Logo.png";
import { Link } from "react-router-dom";
import Video from "../assets/video/video.mp4";
const Header = () => {
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
        <Link to={"/comics"}>
          <button>COMICS</button>
        </Link>
        <Link to={"/"}>
          <button>CHARACTERS</button>
        </Link>
        <Link to={"/favorites"}>
          <button>FAVORITES</button>
        </Link>
      </div>
    </section>
  );
};
export default Header;
