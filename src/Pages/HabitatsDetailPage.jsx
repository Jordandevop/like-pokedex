import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HabitatService from "../Services/HabitatService";
import { Container } from "react-bootstrap";
import PokemonCard from "../Components/PokemonsCards";

const HabitatsDetailPAge = () => {

    const { name } = useParams();
    const [habitats, setHabitat] = useState([]);
    const [titreHabitat, setTitreHabitat] = useState([])
    const fetchhabitats = async () => {
        try {

            const response = await HabitatService.getPokemonByHabitat(name)

            setTitreHabitat(response.data.names[0].name);


            const res = await HabitatService.getPokemonByHabitat(name)

            setHabitat(res.data.pokemon_species)


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchhabitats()
    }, [])
    return <Container className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column mt-5 justify-content-center">
            <div className="d-flex justify-content-center mt-3">
                <h1 className="mt-3 mb-3">{titreHabitat}</h1>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 col-12">

                {habitats && habitats.map((hab) => {
                    return <PokemonCard pokemonCard={hab}
                        key={hab.url}></PokemonCard>
                })}
            </div>

        </div>




    </Container>
}

export default HabitatsDetailPAge;