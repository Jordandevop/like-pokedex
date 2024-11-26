import axios from "axios";

function getAllVersions() {
  return axios.get("https://pokeapi.co/api/v2/version?limit=100");
}
function getPokemonByVersion(name) {
  return axios.get("https://pokeapi.co/api/v2/version/" + name);
}

function getPokemonByVersionGroup(name) {
  return axios.get("https://pokeapi.co/api/v2/version-group/" + name);
}

function getVersionImgPokemon(url) {
  return axios.get(url);
}

export default {
  getAllVersions,
  getPokemonByVersion,
  getPokemonByVersionGroup,
  getVersionImgPokemon,
};
