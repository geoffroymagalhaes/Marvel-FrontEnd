import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";

// pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
// components
import Header from "./components/Header";

function App() {
  // const favCharacCookie = Cookies.get("favCharac");
  const [favCharacTab, setFavCharacTab] = useState([]);
  console.log(favCharacTab);

  const [favComicTab, setFavComicTab] = useState([]);
  console.log(favComicTab);

  // const [addOrRemove, setAddOrRemove] = useState(false);
  // console.log(addOrRemove);

  // const handleFavCharac = (id) => {
  //   if (!favCharacCookie) {
  //     Cookies.set("favCharac", id, { expires: 7 });
  //   } else {
  //     Cookies.set("favCharac", favCharacCookie + "," + id, { expires: 7 });
  //     setFavCharacTab(favCharacCookie);
  //   }
  // };

  // const handleAddOrRemoveCharac = (id) => {
  //   // console.log(favComicTab.indexOf(id));
  //   if (favCharacTab.indexOf(id) === -1) {
  //     setAddOrRemove(true);
  //   } else {
  //     setAddOrRemove(false);
  //   }
  // };
  const removeFavComic = (id) => {
    let newFavComicTab = [...favComicTab];
    newFavComicTab.splice(favComicTab.indexOf(id), 1);
    setFavComicTab(newFavComicTab);
    Cookies.set("favComic", JSON.stringify(newFavComicTab), {
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
              // favCharacCookie={favCharacCookie}
              favCharacTab={favCharacTab}
              // setFavCharacTab={setFavCharacTab}
              handleFavCharac={handleFavCharac}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              // handleAddOrRemove={handleAddOrRemove}
              // addOrRemove={addOrRemove}
              handleFavComic={handleFavComic}
              favComicTab={favComicTab}
              setFavComicTab={setFavComicTab}
              removeFavComic={removeFavComic}
            />
          }
        />
        <Route path="/comics/character/:id" element={<Character />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
