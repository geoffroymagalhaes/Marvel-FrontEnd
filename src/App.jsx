import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Cookies from "js-cookie";

// pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
// components
import Header from "./components/Header";

function App() {
  useEffect(() => {
    if (Cookies.get("favComic")) {
      const favComicCookie = JSON.parse(Cookies.get("favComic"));
      setFavComicTab(favComicCookie);
    }
    if (Cookies.get("favCharac")) {
      const favCharacCookie = JSON.parse(Cookies.get("favCharac"));
      setFavCharacTab(favCharacCookie);
    }
  }, []);

  const [favCharacTab, setFavCharacTab] = useState([]);
  console.log(favCharacTab);

  const [favComicTab, setFavComicTab] = useState([]);
  console.log(favComicTab);

  const removeFavComic = (id) => {
    let newFavComicTab = [...favComicTab];
    newFavComicTab.splice(favComicTab.indexOf(id), 1);
    setFavComicTab(newFavComicTab);
    Cookies.set("favComic", JSON.stringify(newFavComicTab), {
      expires: 7,
    });
  };
  const removeFavCharac = (id) => {
    let newFavCharacTab = [...favCharacTab];
    newFavCharacTab.splice(favCharacTab.indexOf(id), 1);
    setFavCharacTab(newFavCharacTab);
    Cookies.set("favComic", JSON.stringify(newFavCharacTab), {
      expires: 7,
    });
  };
  const handleFavCharac = (id) => {
    let newFavCharacTab = [...favCharacTab];
    newFavCharacTab.push(id);
    setFavCharacTab(newFavCharacTab);
    Cookies.set("favCharac", JSON.stringify(newFavCharacTab), {
      expires: 7,
    });
  };
  const handleFavComic = (id) => {
    let newFavComicTab = [...favComicTab];
    newFavComicTab.push(id);
    setFavComicTab(newFavComicTab);
    Cookies.set("favComic", JSON.stringify(newFavComicTab), {
      expires: 7,
    });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              favCharacTab={favCharacTab}
              handleFavCharac={handleFavCharac}
              removeFavCharac={removeFavCharac}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              favComicTab={favComicTab}
              handleFavComic={handleFavComic}
              removeFavComic={removeFavComic}
            />
          }
        />
        <Route
          path="/comics/character/:id"
          element={
            <Character
              favComicTab={favComicTab}
              handleFavComic={handleFavComic}
              removeFavComic={removeFavComic}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favComicTab={favComicTab}
              favCharacTab={favCharacTab}
              handleFavCharac={handleFavCharac}
              removeFavCharac={removeFavCharac}
              handleFavComic={handleFavComic}
              removeFavComic={removeFavComic}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
