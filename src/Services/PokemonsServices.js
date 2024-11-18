import axios from "axios";

function getAllPokemons(offset, limit) {
  return axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit
  );
}

export default {
  getAllPokemons,
};
