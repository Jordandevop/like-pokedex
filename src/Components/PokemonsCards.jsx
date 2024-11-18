import { Card } from "react-bootstrap";

const PokemonCard = ({ pokemonCard }) => {
    return <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={"https://img.pokemondb.net/artwork/" + pokemonCard.name + ".jpg"} />
        <Card.Body>
            <Card.Title className='d-flex justify-content-center mb-2'>{pokemonCard.name}</Card.Title>
            <Card.Text>

            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
}

export default PokemonCard;