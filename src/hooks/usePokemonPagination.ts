import { useEffect, useState } from "react";
import { PokemonProps, PokemonListItemProps, getAllPokemon, getPokemon } from "../utils/pokemon";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
// const sleep = (ms: number): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };

export const usePokemonPagination = (initialURL: string) => {
  const [currentURL, setCurrentURL] = useState<string>(initialURL);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<PokemonProps[]>([]);
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);

  const loadPokemon = async (data: PokemonListItemProps[]) => {
    const pokemonDataDetails = await Promise.all(
      data.map((pokemon) => getPokemon(pokemon.url))
      // data.map((pokemon) => {
      //   let pokemonRecord = getPokemon(pokemon.url);
      //   return pokemonRecord;
      // })
    );
    setPokemonData(pokemonDataDetails);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllPokemon(currentURL);
        await loadPokemon(data.results);

        setNextURL(data.next);
        setPrevURL(data.previous);
      } catch (err) {
        console.error(err);
        setError("ページの取得に失敗しました。");
      } finally {
        setLoading(false);
        setIsFading(false);
      }
    };

    fetchData();
  }, [currentURL]);

  const changePage = async (url: string) => {
    setIsFading(true);     // フェード開始
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(300);      // フェードが終わるまで待つ
    setCurrentURL(url);    // URL変更 → useEffect発火
  };

  return {
    loading,
    error,
    pokemonData,
    nextURL,
    prevURL,
    isFading,
    changePage,
  };
};
