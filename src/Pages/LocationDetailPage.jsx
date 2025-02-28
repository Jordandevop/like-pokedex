import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationsService from "../Services/LocationsService";
import { Container } from "react-bootstrap";
import PokemonCard from "../Components/PokemonsCards";


const LocationdetailPage = () => {
    const { name } = useParams();
    const [tireLoc, setTitreLoc] = useState([]);
    const [location, setLocation] = useState([]);

    const fetchLocation = async () => {
        try {
            const response = await LocationsService.getPokemonByLocation(name);
            setTitreLoc(response.data.names[1].name);
            setLocation(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchLocation()
    }, [])
    return <Container className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column mt-5 justify-content-center">
            <div className="d-flex justify-content-center mt-3">
                <h1 className="mt-3 mb-3">{tireLoc}</h1>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 col-12">

                {location.pokemon_encounters && location.pokemon_encounters.map((loc) => {
                    return <PokemonCard pokemonCard={loc.pokemon}
                        key={loc.pokemon.name}></PokemonCard>
                })}
            </div>
        </div>
    </Container>;
}

export default LocationdetailPage;