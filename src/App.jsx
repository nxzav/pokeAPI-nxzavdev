import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon-form/';

function App() {
  const [pokemons, setPokemons] = useState([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch(`${API_URL}?offset=0&limit=63`);
      const data = await response.json();
      const fetchPromises = data.results.map((result) => {
        console.log('fetching');
        return fetch(result.url)
          .then((res) => res.json())
          .then((data) => data);
      });
      try {
        const pokeImages = await Promise.all(fetchPromises);
        setPokemons(pokeImages);
      } catch (error) {
        console.error('Error fetching pokemon images: ', error);
      }
    };
    getPokemons();
  }, []);

  return (
    <>
      <div className="nav-buttons">
        <nav>
          <div className="prev"></div>
          <div className="next"></div>
        </nav>
      </div>
      <header>
        <h1>PokeAPI Paginator</h1>
      </header>
      <main>
        <div className="container grid">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p className="poke-name">{pokemon.name}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
