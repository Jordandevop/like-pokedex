import axios from "axios";

function getHabitat() {
  return axios.get("https://pokeapi.co/api/v2/pokemon-habitat/");
}

function getPokemonByHabitat(name) {
  return axios.get("https://pokeapi.co/api/v2/pokemon-habitat/" + name);
}

export default {
  getHabitat,
  getPokemonByHabitat,
};
