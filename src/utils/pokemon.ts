import axios from "axios";

export const getAllPokemon = async (url: string) => {
  console.log(url);
  const response = await axios.get(url);
  return response.data;
};
export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

// 日本語名取得API
export const getPokemonJapaneseName = async (
  id: number
): Promise<string | null> => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const jp = res.data.names.find((n: any) => n.language.name === "ja-Hrkt");
    return jp ? jp.name : null;
  } catch {
    return null;
  }
};
