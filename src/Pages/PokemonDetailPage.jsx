import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PokemonsServices from "../Services/PokemonsServices";


const PokemonDetailPage = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const [infoPokemon, setInfoPokemon] = useState([])
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }


    const fetchPokemonByName = async () => {
        try {
            const response = await PokemonsServices.getPokemonByName(name);

            const res = await PokemonsServices.getPokemonInfo(name);
            setPokemon({ ...response.data, ...res.data });
            console.log(res.data.types);
            console.log(res.data.game_indices);


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchPokemonByName()
    }, [])



    return <Container className="d-flex flex-row align-items-start gap-4 p-4" >

        <div style={{ backgroundColor: "grey" }}>
            <img style={{ width: "16rem" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png"} alt="illustration pokemon" />
        </div>
        <div className="d-flex flex-column justify-content-center flex-wrap gap-2">
            {pokemon.game_indices && pokemon.game_indices.map((game) => {
                return <Button >{game.version.name} </Button>
            })}

        </div>
        <div className="d-flex flex-column justify-content-start flex-wrap gap-2">
            <h1 >{pokemon.name && pokemon.names[4].name}</h1>

            <p>Numéro Pokédex: {pokemon.order}</p>
            <p>Description: {pokemon.flavor_text_entries && pokemon.flavor_text_entries[24].flavor_text}</p>
            <p>Type : {pokemon.genera && pokemon.genera[3].genus}</p>
            <p>Lieu de vie : {pokemon.habitat && pokemon.habitat.name}</p>
            <p>Versions : {pokemon.habitat && pokemon.habitat.name}</p>
            <Button variant="primary" onClick={() => { navigateTo("/") }}>Retour aux Pokemon</Button>
        </div>

        <div>
            {pokemon.types && pokemon.types.map((type) => {
                return <Button>{type.type.name}</Button>
            })}
        </div>








    </Container >;
}

export default PokemonDetailPage;