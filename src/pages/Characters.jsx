import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import LikeImg from "../assets/img/noun.png";

const Characters = ({ handleFavCharac, favCharacTab, removeFavCharac }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/?name=${search}&page=${page}`
        );

        // console.log(response.data.results);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page, favCharacTab]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <div className="heroCharacters">
        <div className="heroBackground">
          <h1>MARVEL CHARACTERS</h1>
          <h2>
            Get hooked on a hearty helping of heroes and villains from the
            humble House of Ideas!
          </h2>
          <input
            placeholder="Looking for a character ?"
            type="text"
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="charactersContainer">
        {data.results.map((character) => {
          return character.thumbnail.extension === "gif" ||
            character.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            ""
          ) : (
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
                <div className="infoCharac">
                  {" "}
                  <h2>{character.description}</h2>
                </div>

                <div className="bottomCard">
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
export default Characters;
