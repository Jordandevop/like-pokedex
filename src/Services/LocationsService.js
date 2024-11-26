import axios from "axios";

function getAllLocations() {
  return axios.get("https://pokeapi.co/api/v2/location-area/?limit=10000");
}

function getPokemonByLocation(name) {
  return axios.get("https://pokeapi.co/api/v2/location-area/" + name);
}

export default {
  getAllLocations,
  getPokemonByLocation,
};
