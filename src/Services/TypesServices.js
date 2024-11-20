import axios from "axios";

function GetAlltypes() {
  return axios.get("https://pokeapi.co/api/v2/type");
}

export default {
  GetAlltypes,
};
