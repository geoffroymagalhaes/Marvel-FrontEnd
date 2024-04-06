import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
// components
import Header from "./components/Header";

function App() {
  const favCharacCookie = Cookies.get("favCharac");
  const [favCharacTab, setFavCharacTab] = useState(
    favCharacCookie ? favCharacCookie : null
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              favCharacCookie={favCharacCookie}
              favCharacTab={favCharacTab}
              setFavCharacTab={setFavCharacTab}
            />
          }
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/character/:id" element={<Character />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
