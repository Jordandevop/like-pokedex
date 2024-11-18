import { useEffect, useState } from "react";
import PokemonsServices from "../Services/PokemonsServices";
import { Await, useNavigate } from "react-router-dom";
import { Container, Pagination } from "react-bootstrap";
import PokemonCard from "../Components/PokemonsCards";

const HomePage = () => {

    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(18)
    const [currentPage, SetCurrentPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(500);




    const fetchPokemons = async () => {
        try {
            const offset = (currentPage - 1) * limit;
            const response = await PokemonsServices.getAllPokemons(offset, limit);
            setPokemons(response.data.results);

            SetMaxPage(response.data.count / limit)



        } catch (error) {
            console.log(error);


        }
    }

    useEffect(() => {
        fetchPokemons()
    }, [currentPage])
    return <Container className="d-flex flex-column align-items-center" >

        <h1>Bienvenue sur le Pokedex</h1>


        <div className="d-flex justify-content-center flex-wrap gap-5 col-10">
            {pokemons.map((pokemon) => {
                return <PokemonCard pokemonCard={pokemon} key={pokemon.name}></PokemonCard>
            })}
        </div>
        <Pagination className="mt-5">
            {currentPage > 1 && <>
                <Pagination.First onClick={() => { SetCurrentPage(1) }} />
                <Pagination.Prev onClick={() => { SetCurrentPage(currentPage - 1) }} />
                <Pagination.Item onClick={() => { SetCurrentPage(1) }}>{1}</Pagination.Item>



            </>}

            {currentPage - 5 > 0 && <>
                <Pagination.Ellipsis onClick={() => { SetCurrentPage(currentPage - 5) }} />
            </>}

            {(currentPage != 2 && currentPage > 1) && <>
                <Pagination.Item onClick={() => { SetCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
            </>}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage + 1 < maxPage && <>
                <Pagination.Item onClick={() => { SetCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
            </>}



            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => { SetCurrentPage(currentPage + 5) }} />
            </>}

            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => { SetCurrentPage(maxPage) }}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => { SetCurrentPage(currentPage + 1) }} />
                <Pagination.Last onClick={() => { SetCurrentPage(maxPage) }} />
            </>}

        </Pagination>

    </Container>;
}

export default HomePage;