import { useEffect, useState } from 'react';
import './App.css';
import Card from './component/Card/Card';
import Navbar from './component/Navbar/Navbar';
import SkeletonCard from './component/SkeletonCard/SkeletonCard';
import { PokemonProps, PokemonListItemProps, getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<PokemonProps[]>([]);
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous); // 最初のページ読み込み時はnullになる
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: PokemonListItemProps[]) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  const handleNextPage = async () => {
    if (!nextURL) return;

    setIsFading(true);

    setTimeout(async () => {
      setLoading(true);

      let data = await getAllPokemon(nextURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);

      setLoading(false);
      setIsFading(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300); // CSSと合わせる
  };

  const handlePrevPage = async () => {
    // 最初のページ読み込み時はprevURLがnullなので、何もしない
    if (!prevURL) return;

    setIsFading(true);

    setTimeout(async () => {
      setLoading(true);

      let data = await getAllPokemon(prevURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);

      setLoading(false);
      setIsFading(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <>
    <div className='App'>
      {loading ? (
        <div className='SkeletonCardWrapper'>
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <Navbar />
          <div className={`pokemonCardWrapper ${isFading ? "fade-out" : "fade-in"}`}>
            {pokemonData.map((pokemon, index) => {
              return <Card key={index} pokemon={pokemon} />;
            })}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage} disabled={!prevURL}>前へ</button>
            <button onClick={handleNextPage} disabled={!nextURL}>次へ</button>
          </div>
        </>
      )}
    </div>
    </>
  )
};

export default App;
