import { useEffect, useState } from "react";
import PokemonsServices from "../Services/PokemonsServices";
import { Container, Form, Pagination } from "react-bootstrap";
import PokemonCard from "../Components/PokemonsCards";

const HomePage = () => {

    const [pokemons, setPokemons] = useState([]);
    const limit = 20;
    const [currentPage, SetCurrentPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(500);
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setfilteredPokemon] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const fetchPokemons = async () => {
        try {
            const offset = (currentPage - 1) * limit;
            const response = await PokemonsServices.getAllPokemons(offset, limit);
            setPokemons(response.data.results);

            SetMaxPage(Math.ceil(response.data.count / limit));
            setfilteredPokemon(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, [currentPage, limit]);

    useEffect(() => {
        setfilteredPokemon(pokemons.filter((poke) => {
            return poke.name.toLowerCase().startsWith(searchValue.toLowerCase());
            // return poke.name.toLowerCase().includes(searchValue.toLowerCase());
        }))

    }, [searchValue, pokemons]);

    useEffect(() => {
        if (searchValue == "") { SetCurrentPage(1) }
    }, [searchValue])
    return <Container className="d-flex flex-column align-items-center " >
        <Form>
            <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-3" >Recherche ton Pokemon</Form.Label>
                <Form.Control type="text" placeholder="Pikachu" value={searchValue} onChange={handleChange} />
            </Form.Group>
        </Form>
        <h1 className="mt-5">Bienvenue sur le Pokedex</h1>

        <div className="d-flex justify-content-center flex-wrap gap-3 col-10">
            {filteredPokemon.map((pokemon) => {
                return <PokemonCard pokemonCard={pokemon} key={pokemon.name}></PokemonCard>
            })}
        </div>
        <Pagination className="m-3">
            {currentPage - 1 >= 1 && <>
                <Pagination.First onClick={() => { SetCurrentPage(1) }} />
                <Pagination.Prev onClick={() => { SetCurrentPage(currentPage - 1) }} />

            </>}

            {currentPage - 5 >= 1 && <>
                <Pagination.Ellipsis onClick={() => { SetCurrentPage(currentPage - 5) }} />
            </>}

            {currentPage > 2 && <Pagination.Item onClick={() => { SetCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage + 1 <= maxPage && <Pagination.Item onClick={() => { SetCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>}

            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => { SetCurrentPage(currentPage + 5) }} />
            </>}

            {currentPage + 1 <= maxPage && <>

                <Pagination.Next onClick={() => { SetCurrentPage(currentPage + 1) }} />
                <Pagination.Last onClick={() => { SetCurrentPage(maxPage) }} />
            </>}
        </Pagination>
    </Container>;
}

export default HomePage;
