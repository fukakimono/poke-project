import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Pagination from "./components/Pagination";
import { usePokemonQuery } from "./hooks/usePokemonQuery";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=6");
  const [pageInfo, setPageInfo] = useState<{
    next: string | null;
    previous: string | null;
  }>({ next: null, previous: null });

  const {
    isBoardLoading,
    error,
    idList,
    imageList,
    nameList,
    typesList,
    allPokemon,
  } = usePokemonQuery(url);

  // ページ情報の更新
  // allPokemonが変わったときにpageInfoを更新
  useEffect(() => {
    if (allPokemon) {
      setPageInfo({ next: allPokemon.next, previous: allPokemon.previous });
    }
  }, [allPokemon]);

  if (error) return <p>何らかのエラーが起きました。</p>;

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
        ) : idList.length > 0 ? (
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
