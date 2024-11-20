import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Radar } from 'react-chartjs-2';
import { useNavigate, useParams } from "react-router-dom";
import PokemonsServices from "../Services/PokemonsServices";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const PokemonDetailPage = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const [evolution, setEvolution] = useState([])

    const navigate = useNavigate();


    const fetchPokemonByName = async () => {
        try {
            const response = await PokemonsServices.getPokemonByName(name);
            const res = await PokemonsServices.getPokemonInfo(name);
            const resBis = await PokemonsServices.getStats(res.data.types[0].type.name);
            const resEvol = await PokemonsServices.getEvolution(response.data.evolution_chain.url);

            setPokemon({ ...resBis.data, ...res.data, ...response.data });
            setEvolution(resEvol.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchPokemonByName()
    }, [name])

    const labels = pokemon.stats ? pokemon.stats.map(stat => stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)) : [];
    const dataValues = pokemon.stats ? pokemon.stats.map(stat => stat.base_stat) : [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stats',
                data: dataValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: false,
                },
                suggestedMin: 0,
                suggestedMax: 200,
            },
        },
    };

    return <Container className="d-flex col-10 align-items-start mt-3" >


        <div className="d-flex flex-column col-4 mt-5 ">
            <h1 className="d-flex justify-content-center">{pokemon.name && pokemon.names[4].name} N°{pokemon.order}</h1>
            <div style={{ backgroundColor: "grey", width: "24rem" }}>

                <img style={{ width: "16rem" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png"} alt="illustration pokemon" />
            </div>
            <div className="d-flex flex-column">
                <h1 className="d-flex justify-content-center">Statistiques du Pokémon</h1>

                <Radar data={data} options={options} />

            </div>

        </div>

        <div className="d-flex flex-column col-4 m-5 ">
            <div className="d-flex flex-column m-1">
                <h5>Biographie</h5>
                <p>{pokemon.flavor_text_entries && pokemon.flavor_text_entries[32].flavor_text}</p>
            </div>
            <div className="d-flex flex-wrap m-1" >
                <h5>Version de Jeux: <br />   {pokemon.game_indices && pokemon.game_indices.map((game) => {
                    return <Button key={game.version.name} className={game.version.name + " m-1"} style={{ minWidth: "3rem", height: "30px" }
                    }> {game.version.name} </Button>
                })}</h5>


            </div>
            <div className="d-flex flex-column m-1">
                <h5>Types : <br /> {pokemon.types && pokemon.types.map((type) => {
                    return <Button key={type.type.name} className={type.type.name + " m-1"} onClick={() => {
                        navigate('/type/' + type.type.name)
                    }} >{type.type.name}</Button>
                })}</h5>
                {/* <h5>Lieu de vie : {pokemon.habitat && pokemon.habitat.name}</h5> */}
                <div className="d-flex ">
                    <h5>Faiblesses : <br />{pokemon.damage_relations && pokemon.damage_relations.double_damage_from.map((faiblesse) => {
                        return <Button key={faiblesse.name} className={faiblesse.name + " m-1"} style={{ width: "fit-content", height: "fit-content" }}>{faiblesse.name}</Button>
                    })
                    }</h5>


                </div>
                <div className="d-flex flex-column">
                    <h5>Fort contre : <br />{pokemon.damage_relations && pokemon.damage_relations.double_damage_to.map((fort) => {
                        return <Button key={fort.name} className={fort.name + " m-1"} style={{ width: "fit-content", height: "fit-content" }}>{fort.name}</Button>
                    })
                    }
                    </h5>
                </div>
                <div className={pokemon.types && pokemon.types[0].type.name + " d-flex mb-2 p-3"} style={{ borderRadius: "10px", width: "fit-content", height: "fit-content" }}>


                    <div className="d-flex flex-column col-4">
                        <div>
                            <p style={{ color: "white" }}>Taille :</p>
                            <p>{pokemon.height}</p>
                        </div>
                        <div>
                            <p style={{ color: "white" }}>Poids :</p>
                            <p>{pokemon.weight}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <p style={{ color: "white" }}>Compétences :</p>

                        <p className="d-flex flex-column">{pokemon.abilities && pokemon.abilities.map((competence) => {
                            return <Button key={competence.ability.name} className="mb-4" variant="secondary">{competence.ability.name}</Button>
                        })}</p>

                    </div>

                </div>


            </div>


        </div>
        <div className="d-flex flex-column col-4 align-items-center mt-5">

            <h1>Evolution du pokemon</h1>

            {evolution.chain && evolution.chain.species.name !== name && (
                <img
                    className="mb-5"
                    style={{ width: "9rem", cursor: "pointer" }}
                    src={"https://img.pokemondb.net/artwork/" + evolution.chain.species.name + ".jpg"}
                    onClick={() => {
                        navigate('/pokemon/' + evolution.chain.species.name, { replace: true });
                    }}
                    alt={evolution.chain.species.name}
                />
            )}

            {evolution.chain &&
                evolution.chain.evolves_to.length > 0 &&
                evolution.chain.evolves_to[0].species.name !== name && (
                    <img
                        className="mb-5"
                        style={{ width: "15rem", cursor: "pointer" }}
                        src={"https://img.pokemondb.net/artwork/" + evolution.chain.evolves_to[0].species.name + ".jpg"}
                        onClick={() => {
                            navigate('/pokemon/' + evolution.chain.evolves_to[0].species.name, { replace: true });
                        }}
                        alt={evolution.chain.evolves_to[0].species.name}
                    />
                )}
            {evolution.chain &&
                evolution.chain.evolves_to.length > 0 &&
                evolution.chain.evolves_to[0].evolves_to.length > 0 &&
                evolution.chain.evolves_to[0].evolves_to[0].species.name !== name && (
                    <img
                        className="mt-4"
                        style={{ width: "15rem", cursor: "pointer" }}
                        src={"https://img.pokemondb.net/artwork/" + evolution.chain.evolves_to[0].evolves_to[0].species.name + ".jpg"}
                        onClick={() => {
                            navigate('/pokemon/' + evolution.chain.evolves_to[0].evolves_to[0].species.name, { replace: true });
                        }}
                        alt={evolution.chain.evolves_to[0].evolves_to[0].species.name}
                    />
                )}
            <Button variant="primary" onClick={() => { navigate("/") }}>Retour aux Pokemon</Button>



        </div>




    </Container >;
}

export default PokemonDetailPage;