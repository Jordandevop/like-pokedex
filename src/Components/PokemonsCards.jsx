import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemonCard }) => {
    const navigate = useNavigate();
    const navigateTo = (name) => {
        navigate("/pokemon/" + name)
    }
    return <Card style={{ width: '20rem' }} onClick={() => { navigateTo(pokemonCard.name) }}>
        <Card.Img style={{ maxwidth: " 15rem" }} variant="top" src={"https://img.pokemondb.net/artwork/" + pokemonCard.name + ".jpg"} />
        <Card.Body>
            <Card.Title className='d-flex justify-content-center mb-2'>{pokemonCard.name}</Card.Title>
            <Card.Text>

            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
}

export default PokemonCard;