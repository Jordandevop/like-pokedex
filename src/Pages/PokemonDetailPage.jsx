import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetailPage = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState([]);

    const fetchPokemonById = () => {
        try {

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchPokemonById()
    }, [])

    return <>
    </>;
}

export default PokemonDetailPage;