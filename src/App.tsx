import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Pagination from "./components/Pagination";
import {
  getAllPokemon,
  getPokemonDetails,
  getPokemonJapaneseName,
} from "./utils/pokemon";

type NamedAPIResource = {
  name: string;
  url: string;
};
type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};
type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};
// ポケモンの画像
type PokemonSprites = {
  front_default: string;
};
export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
};

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=6");
  const [pageInfo, setPageInfo] = useState<{
    next: string | null;
    previous: string | null;
  }>({ next: null, previous: null });

  const {
    isLoading,
    error,
    data: allPokemon,
  } = useQuery({
    queryKey: ["pokemon-list", url],
    queryFn: async () => {
      const result = await getAllPokemon(url);
      setPageInfo({ next: result.next, previous: result.previous });
      return result;
    },
  });

  // 6体分の詳細データを取得
  const {
    data: details,
    isLoading: detailsLoading,
    error: detailsError,
  } = useQuery({
    queryKey: ["pokemon-details", allPokemon?.results?.map((p: any) => p.url)],
    queryFn: async () => {
      if (!allPokemon) return [];
      const results = allPokemon.results;
      if (!results || results.length === 0) return [];
      const detailList = await Promise.all(
        results.map((p: any) => getPokemonDetails(p.url))
      );
      return detailList;
    },
    enabled: !!allPokemon,
  });

  if (error || detailsError) return <p>何らかのエラーが起きました。</p>;

  // Board用のリストを作成
  const idList = details?.map((p: any) => p.id) || [];
  const imageList = details?.map((p: any) => p.sprites.front_default) || [];
  // 日本語名取得
  const { data: jpNames = [], isLoading: jpLoading } = useQuery({
    queryKey: ["pokemon-jp-names", idList],
    queryFn: async () => {
      return await Promise.all(
        idList.map((id: number) => getPokemonJapaneseName(id))
      );
    },
    enabled: idList.length > 0,
  });
  const nameList =
    jpNames.length === idList.length && jpNames.every(Boolean)
      ? jpNames
      : [];
  const typesList =
    details?.map((p: any) => p.types.map((t: any) => t.type.name)) || [];

  const isBoardLoading = isLoading || detailsLoading || jpLoading || nameList.length !== idList.length;

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ flex: 1, minHeight: 320 }}>
        {isBoardLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <p>ローディング中...</p>
          </div>
        ) : details && details.length > 0 ? (
          <Board
            idList={idList}
            imageList={imageList}
            nameList={nameList}
            typesList={typesList}
          />
        ) : (
          <p>データがありません</p>
        )}
      </div>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
        <Pagination
          onPrev={() => pageInfo.previous && setUrl(pageInfo.previous!)}
          onNext={() => pageInfo.next && setUrl(pageInfo.next!)}
          prevDisabled={!pageInfo.previous}
          nextDisabled={!pageInfo.next}
        />
      </div>
    </div>
  );
}

export default App;
