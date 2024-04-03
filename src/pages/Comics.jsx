import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(` http://localhost:3000/comics`);

        console.log(response.data);
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
      <div className="comicsContainer">
        {data.results.map((comic) => {
          return comic.thumbnail.extension === "gif" ||
            comic.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            ""
          ) : (
            <article className="comicContainer">
              <img
                src={comic.thumbnail.path + "/portrait_fantastic.jpg"}
                alt=""
              />
              <h1>{comic.title}</h1>
              <h2>{comic.description}</h2>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Comics;
