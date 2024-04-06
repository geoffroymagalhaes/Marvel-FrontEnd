import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import LikeImg from "../assets/img/noun.png";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const favComicCookie = Cookies.get("favComic");
  const [favComicTab, setFavComicTab] = useState(
    favComicCookie ? favComicCookie : null
  );
  const handleFavComic = (id) => {
    if (!favComicCookie) {
      Cookies.set("favComic", id, { expires: 7 });
    } else {
      Cookies.set("favComic", favComicCookie + "," + id, { expires: 7 });
      setFavComicTab(favComicCookie);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/comics/?title=${search}&page=${page}`
        );
        // console.log(search);
        // console.log(response.data.results);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, page, favComicTab]);

  console.log(favComicTab);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <div className="comicCharacters">
        <div className="comicBackground">
          <h1>MARVEL COMICS</h1>
          <h2>
            Dive into the vibrant universe of comics, where every panel tells a
            story and sparks your imagination to life!
          </h2>
          <input
            placeholder="Looking for a comic ?"
            type="text"
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="comicsContainer">
        {data.results.map((comic) => {
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
              <div
                onClick={() => {
                  handleFavComic(comic._id);
                  // Permet de créer ou de modifier la valeur d'un cookie et de définir une date d'expiration
                }}
                className="likeImg"
              >
                <img src={LikeImg} alt="" />
              </div>
              {/* <img
                src={comic.thumbnail.path + "/portrait_fantastic.jpg"}
                alt=""
              /> */}
              {/* <h1>{comic.title}</h1>
              <h2>{comic.description}</h2> */}
            </article>
          );
        })}
      </div>
      <div className="pageButton">
        {page !== 1 ? (
          <button
            onClick={() => {
              setPage(1);
            }}
          >
            &lt;&lt;
          </button>
        ) : (
          <button
            disabled
            onClick={() => {
              setPage(1);
            }}
          >
            &lt;&lt;
          </button>
        )}

        {page !== 1 ? (
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            &lt;
          </button>
        ) : (
          <button
            disabled
            onClick={() => {
              setPage(page - 1);
            }}
          >
            &lt;
          </button>
        )}

        <button>{page}</button>

        {page !== (data.count / 100).toFixed() ? (
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            &gt;
          </button>
        ) : (
          <button
            disabled
            onClick={() => {
              setPage(page + 1);
            }}
          >
            &gt;
          </button>
        )}
        {page !== (data.count / 100).toFixed() ? (
          <button
            onClick={() => {
              setPage((data.count / 100).toFixed());
            }}
          >
            &gt;&gt;
          </button>
        ) : (
          <button
            disabled
            onClick={() => {
              setPage((data.count / 100).toFixed());
            }}
          >
            &gt;&gt;
          </button>
        )}
      </div>
    </section>
  );
};
export default Comics;
