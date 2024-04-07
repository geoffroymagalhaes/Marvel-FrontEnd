import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import LikeImg from "../assets/img/noun.png";

const Favorites = ({
  handleFavComic,
  favComicTab,
  removeFavComic,
  favCharacTab,
  handleFavCharac,
  removeFavCharac,
}) => {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(` http://localhost:3000/comics`);
        console.log(data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await axios.get(` http://localhost:3000`);
        console.log(data2);
        setData2(response.data);
        setIsLoading2(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  }, [favComicTab, favCharacTab]);
  return isLoading || isLoading2 ? (
    <p>Loading...</p>
  ) : (
    <section className="favorites">
      <div className="heroFavorites">
        <div className="heroFavoritesBackground">
          <h1>FAVORITES</h1>
          <h2>
            Explore the Marvel Universe through your chosen favorites, where
            legendary characters and epic tales await your discovery!
          </h2>
        </div>
      </div>
      {favComicTab.length !== 0 && (
        <div>
          <p>YOUR CHARACTERS COLLECTION</p>
        </div>
      )}
      {favCharacTab.length === 0 && favComicTab.length === 0 ? (
        <div>
          <p>YOUR COLLECTION IS EMPTY</p>
        </div>
      ) : null}

      <div className="comicsContainer">
        {data.results.map((comic) => {
          if (
            favComicTab.indexOf(comic._id) === -1 ||
            comic.thumbnail.extension === "gif" ||
            comic.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
          ) {
            return null;
          }
          return (
            <article
              className="comicCard"
              style={{
                backgroundImage: `url(${comic.thumbnail.path}/portrait_uncanny.jpg)`,
              }}
            >
              {favComicTab.indexOf(comic._id) === -1 && (
                <button
                  className="likeImg"
                  onClick={() => {
                    handleFavComic(comic._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
              {favComicTab.indexOf(comic._id) !== -1 && (
                <button
                  className="likeImg active"
                  onClick={() => {
                    removeFavComic(comic._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
            </article>
          );
        })}
      </div>
      {favCharacTab.length !== 0 && (
        <div>
          <p>YOUR CHARACTERS COLLECTION</p>
        </div>
      )}
      <div className="charactersContainer">
        {data2.results.map((character) => {
          if (
            favCharacTab.indexOf(character._id) === -1 ||
            character.thumbnail.extension === "gif" ||
            character.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
          ) {
            return null;
          }
          return (
            <div className="characterCard">
              <Link
                className="cardImg"
                to={`/comics/character/${character._id}`}
                style={{
                  backgroundImage: `url(${
                    character.thumbnail.path + "/portrait_uncanny.jpg"
                  })`,
                }}
              >
                <div className="bottomCard">
                  {/* <h2>{character.description}</h2> */}
                  <h1>{character.name}</h1>
                </div>
              </Link>
              {favCharacTab.indexOf(character._id) === -1 && (
                <button
                  className="likeImg  "
                  onClick={() => {
                    handleFavCharac(character._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
              {favCharacTab.indexOf(character._id) !== -1 && (
                <button
                  className="likeImg  active"
                  onClick={() => {
                    removeFavCharac(character._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Favorites;
