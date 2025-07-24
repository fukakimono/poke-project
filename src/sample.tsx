import { useQuery } from "@tanstack/react-query";
import { getAllPokemon, getPokemonDetails } from "./utils/pokemon"; // API メソッドをインポート

const MyComponent = () => {
  // 最初のデータを取得する
  const {
    isLoading: initialLoading,
    error: initialError,
    data: initialData,
  } = useQuery(
    ["pokemon-list"], // 最初のクエリキー
    async () => {
      return await getAllPokemon("https://pokeapi.co/api/v2/pokemon");
    }
  );

  if (initialLoading) return <p>Loading...</p>;
  if (initialError) return <p>Error: {initialError.message}</p>;

  // 各ポケモンの詳細情報を取得する
  const pokemonDetails = initialData.results.map((pokemon) => {
    const { isLoading, error, data } = useQuery(
      ["pokemon-details", pokemon.url], // 詳細クエリのキー
      async () => {
        return await getPokemonDetails(pokemon.url); // 詳細情報を取得する関数
      }
    );

    return {
      ...pokemon,
      isLoading,
      error,
      details: data,
    };
  });

  // データをレンダリングする
  return (
    <ul>
      {pokemonDetails.map((pokemon) => (
        <li key={pokemon.url}>
          {pokemon.isLoading ? (
            <p>Loading...</p>
          ) : pokemon.error ? (
            <p>Error: {pokemon.error.message}</p>
          ) : (
            <>
              <h2>{pokemon.name}</h2>
              {pokemon.details && (
                <img
                  src={pokemon.details.sprites.front_default}
                  alt={pokemon.name}
                />
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

// 別ファイル utils/pokemon.js
export const getAllPokemon = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
