import './App.css';
import Card from './component/Card/Card';
import Navbar from './component/Navbar/Navbar';
import SkeletonCard from './component/SkeletonCard/SkeletonCard';
import { usePokemonPagination } from "./hooks/usePokemonPagination";

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";

  const {
    loading,
    error,
    pokemonData,
    nextURL,
    prevURL,
    isFading,
    changePage,
  } = usePokemonPagination(initialURL);
console.log(pokemonData);
  return (
    <div className="App">
      {error && <p>{error}</p>}

      <Navbar />

      {loading ? (
        <div className='SkeletonCardWrapper'>
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className={`pokemonCardWrapper ${isFading ? "fade-out" : "fade-in"}`}>
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <div className="btn">
            {/* prevURL が truthy（= nullじゃない）なら実行 */}
            <button onClick={() => prevURL && changePage(prevURL)} disabled={!prevURL}>前へ</button>
            <button onClick={() => nextURL && changePage(nextURL)} disabled={!nextURL}>次へ</button>
                  {/*
                    onClick={() => {
                      if (prevURL) {
                        changePage(prevURL);
                      }
                    }}
                  */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
