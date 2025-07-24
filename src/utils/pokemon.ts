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
