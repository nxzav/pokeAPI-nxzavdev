import { useState, useEffect, useContext } from 'react';
import { AnimationContext } from '../App';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// eslint-disable-next-line react/prop-types
export default function Pokemons({ page }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState();
  const { animate } = useContext(AnimationContext);

  const playSound = () => {
    const sound = new Audio('http://localhost:5173/sound.mp3');
    sound.volume = 0.5;
    sound.play();
  };

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      const limit = 54;
      const offset = page * 54 - 54;
      const response = await fetch(
        `${API_URL}?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      const fetchPromises = data.results.map((result) => {
        return fetch(result.url)
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
      });
      try {
        const pokeImages = await Promise.all(fetchPromises);
        setPokemons(pokeImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemon images: ', error);
      }
    };
    getPokemons();
  }, [page]);

  return (
    <>
      <div className="container pagination">
        <span>{page} / 25</span>
      </div>
      <div className="container grid">
        {!loading ? (
          pokemons.map((pokemon) => (
            <div key={pokemon.id} className="card" onMouseEnter={playSound}>
              <p className="poke-id">{pokemon.id}</p>
              {animate ? (
                <img
                  src={pokemon.sprites.other.showdown.front_default}
                  alt={pokemon.name}
                />
              ) : (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              )}

              <p className="poke-name">{pokemon.name}</p>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
