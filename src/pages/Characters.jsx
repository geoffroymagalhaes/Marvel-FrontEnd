import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Characters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(` http://localhost:3000/`);

        // console.log(response.data.results);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <div></div>
      <div className="charactersContainer">
        {data.results.map((character) => {
          return character.thumbnail.extension === "gif" ||
            character.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            ""
          ) : (
            <article
              className="characterCard"
              style={{
                backgroundImage: `url(${
                  character.thumbnail.path + "/portrait_uncanny.jpg"
                })`,
              }}
            >
              <Link to={`/comics/character/${character._id}`}>
                <h1>{character.name}</h1>
                <h2>{character.description}</h2>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Characters;
