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

function getStats(name) {
  return axios.get("https://pokeapi.co/api/v2/type/" + name);
}
function getEvolution(url) {
  return axios.get(url);
}
export default {
  getAllPokemons,
  getPokemonByName,
  getPokemonInfo,
  getStats,
  getEvolution,
};
