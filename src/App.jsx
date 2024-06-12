import { useState, createContext } from 'react';
import Sidebar from './components/Sidebar';
import Pokemons from './components/Pokemons';
import './App.css';

const AnimationContext = createContext();

function App() {
  const [page, setPage] = useState(1);
  const [animate, setAnimate] = useState(false);

  const toggleAnimate = () => {
    setAnimate((prev) => !prev);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <AnimationContext.Provider value={{ animate, toggleAnimate }}>
      <Sidebar />
      <div className="nav-buttons">
        <nav>
          {page >= 25 ? (
            ''
          ) : (
            <div tabIndex="1" className="next" onClick={handleNextPage}></div>
          )}
          {page <= -24 ? (
            ''
          ) : (
            <div tabIndex="0" className="prev" onClick={handlePrevPage}></div>
          )}
        </nav>
      </div>
      <header>
        <div className="header">
          <h1>PokeAPI Paginator</h1>
        </div>
      </header>
      <main>
        <Pokemons page={page} />
      </main>
    </AnimationContext.Provider>
  );
}

export { AnimationContext };
export default App;
