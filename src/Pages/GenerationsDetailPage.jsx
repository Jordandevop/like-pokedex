import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenerationsServices from "../Services/GenerationsServices";
import PokemonCard from "../Components/PokemonsCards";
import { Container, Form } from "react-bootstrap";

const GenerationsDetailsPages = () => {
    const { name } = useParams();
    const [generation, setGeneration] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value);
    };

    const fetchGenerationByName = async () => {
        try {
            const response = await GenerationsServices.getPokemonByGeneration(name);
            console.log(response.data.pokemon_species);
            setGeneration(response.data)
            setFilteredPokemon(response.data.pokemon_species)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchGenerationByName();
    }, [name])

    useEffect(() => {
        if (searchValue === "") {
            setFilteredPokemon(generation.pokemon_species);
        } else {
            setFilteredPokemon(
                generation.pokemon_species.filter((poke) =>
                    poke.name.toLowerCase().startsWith(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, generation]);

    return <Container className="d-flex flex-column align-items-center ">
        <Form>
            <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-3">Recherche ton Pokemon</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Pikachu"
                    value={searchValue}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
        <div className="d-flex justify-content-center flex-wrap gap-5 col-12 mt-4">
            {filteredPokemon && filteredPokemon.map((gen) => {
                return <PokemonCard
                    pokemonCard={gen}
                    key={gen.name}
                ></PokemonCard>
            }


            )}
        </div>


    </Container>;
}

export default GenerationsDetailsPages;