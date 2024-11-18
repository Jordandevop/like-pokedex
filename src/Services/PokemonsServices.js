import axios from "axios";

function getAllPokemons(offset, limit) {
  return axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit
  );
}

function getPokemonByName(namePokemon) {
  return axios.get("https://pokeapi.co/api/v2/pokemon-species/" + namePokemon);
}

function getPokemonInfo(name) {
  return axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
}
export default {
  getAllPokemons,
  getPokemonByName,
  getPokemonInfo,
};
