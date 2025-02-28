import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import VersionsServices from "../Services/VersionsServices";
import PokemonCard from "../Components/PokemonsCards";





const VersionsDetailPage = () => {

    const { name } = useParams();

    const [versions, setVersions] = useState([]);
    const [versionBis, setVersionBis] = useState([])



    const fetchVersions = async () => {
        try {

            const response = await VersionsServices.getPokemonByVersion(name);
            setVersionBis(response.data.names[3].name)

            const res = await VersionsServices.getPokemonByVersionGroup(response.data.version_group.name)

            const resTer = await VersionsServices.getVersionImgPokemon(res.data.generation.url)
            setVersions(resTer.data.pokemon_species)



        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchVersions();
    }, [])



    return <Container className="d-flex flex-column align-items-center" >
        <div className="d-flex flex-column mt-5 justify-content-center">


            <div className="d-flex justify-content-center mt-3 mb-3">
                <h1 className="mt-3 mb-3">Pokemon présent dans la version {versionBis}</h1>
            </div>


            <div className="d-flex justify-content-center flex-wrap gap-3 col-12">
                {versions && versions.map((ver) => {
                    return <PokemonCard pokemonCard={ver}
                        key={ver.url}></PokemonCard>
                })}
            </div>



        </div>


    </Container>;
}

export default VersionsDetailPage;