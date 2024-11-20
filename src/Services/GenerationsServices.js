import axios from "axios";

function getAllGenerations() {
  return axios.get("https://pokeapi.co/api/v2/generation/");
}

function getPokemonByGeneration(name) {
  return axios.get("https://pokeapi.co/api/v2/generation/" + name);
}

export default {
  getAllGenerations,
  getPokemonByGeneration,
};
