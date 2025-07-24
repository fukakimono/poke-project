import { useQuery } from "@tanstack/react-query";
import {
  getAllPokemon,
  getPokemonDetails,
  getPokemonJapaneseName,
} from "../utils/pokemon";

export const usePokemonQuery = (url: string) => {
  // 一覧取得
  const {
    isLoading,
    error,
    data: allPokemon,
  } = useQuery({
    queryKey: ["pokemon-list", url],
    queryFn: async () => {
      const result = await getAllPokemon(url);
      return result;
    },
  });

  // 詳細取得
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

  // 日本語名取得
  const idList = details?.map((p: any) => p.id) || [];
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
      : details?.map((p: any) => p.name) || [];
  const imageList = details?.map((p: any) => p.sprites.front_default) || [];
  const typesList =
    details?.map((p: any) => p.types.map((t: any) => t.type.name)) || [];

  const isBoardLoading =
    isLoading ||
    detailsLoading ||
    jpLoading ||
    idList.length === 0 ||
    nameList.length === 0;

  return {
    isBoardLoading,
    error: error || detailsError,
    idList,
    imageList,
    nameList,
    typesList,
    allPokemon,
  };
};
