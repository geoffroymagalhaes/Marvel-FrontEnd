import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ comic }) => {
  const params = useParams();
  // console.log(params);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("useEffect");
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/comics/character/${params.id}`
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
      <h1></h1>
      <h2></h2>

      {data.comics.map((comic) => {
        return (
          <div>
            <h3>{comic.title}</h3>
            <h4>{comic.description}</h4>
            <img
              src={comic.thumbnail.path + "/portrait_fantastic.jpg"}
              alt=""
            />
          </div>
        );
      })}
    </section>
  );
};

export default Character;
