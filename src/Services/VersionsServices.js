import axios from "axios";

function getAllVersions() {
  return axios.get("https://pokeapi.co/api/v2/version");
}

export default {
  getAllVersions,
};
