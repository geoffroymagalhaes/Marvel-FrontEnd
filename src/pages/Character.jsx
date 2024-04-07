import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LikeImg from "../assets/img/noun.png";

const Character = ({ comic, favComicTab, removeFavComic }) => {
  const params = useParams();
  // console.log(params);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("useEffect");
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--tvp4vjmpy6zn.code.run/comics/character/${params.id}`
      );
      // console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []); // Add params.id as a dependency

  return loading ? (
    <p>Chargement ...</p>
  ) : (
    <section>
      <div
        className="heroComicsCharacter"
        style={{
          backgroundImage: `url(${
            data.thumbnail.path + "/portrait_uncanny.jpg"
          })`,
        }}
      >
        <div className="heroComicsCharacterBackground">
          <h1>{data.name}</h1>
          <h2>{data.description}</h2>
        </div>
      </div>

      <div className="comicsContainer">
        {data.comics.map((comic) => {
          return comic.thumbnail.extension === "gif" ||
            comic.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            ""
          ) : (
            <article
              className="comicCard"
              style={{
                backgroundImage: `url(${
                  comic.thumbnail.path + "/portrait_uncanny.jpg"
                })`,
              }}
            >
              {favComicTab.indexOf(comic._id) === -1 && (
                <button
                  className="likeImg  "
                  onClick={() => {
                    handleFavComic(comic._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
              {favComicTab.indexOf(comic._id) !== -1 && (
                <button
                  className="likeImg  active"
                  onClick={() => {
                    removeFavComic(comic._id);
                  }}
                >
                  <img src={LikeImg} alt="" />
                </button>
              )}
              {/* )} */}

              {/* <img
                src={comic.thumbnail.path + "/portrait_fantastic.jpg"}
                alt=""
              /> */}
              {/* <h1>{comic.title}</h1>
              <h2>{comic.description}</h2> */}
              <div className="comicInfo">
                {" "}
                <h1>{comic.title}</h1>
                <h2>{comic.description}</h2>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Character;
