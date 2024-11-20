import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonsServices from "../Services/PokemonsServices";
import { Container, Form } from "react-bootstrap";
import PokemonCard from "../Components/PokemonsCards";

const TypesDetailPage = () => {
    const { name } = useParams();
    const [type, setType] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    // Met à jour la valeur de recherche
    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value);
    };


    const fetchTypeByName = async () => {
        try {
            const response = await PokemonsServices.getStats(name);
            setType(response.data);
            setFilteredPokemon(response.data.pokemon);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchTypeByName();
    }, [name]);


    useEffect(() => {
        if (searchValue === "") {
            setFilteredPokemon(type.pokemon);
        } else {
            setFilteredPokemon(
                type.pokemon.filter((poke) =>
                    poke.pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, type]);

    return (
        <Container className="d-flex flex-column align-items-center ">
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
                {filteredPokemon &&
                    filteredPokemon.map((detailType) => (
                        <PokemonCard
                            pokemonCard={detailType.pokemon}
                            key={detailType.pokemon.name}
                        ></PokemonCard>
                    )
                    )}
            </div>
        </Container>
    );
};

export default TypesDetailPage;
