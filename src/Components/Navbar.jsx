import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return <>
        <Navbar expand="lg" className="bg-body-tertiary d-flex !important ">
            <Container className='d-flex gap-3' style={{ fontSize: "1.3rem" }}>
                <Link to={"/"}>Pokedex</Link>

                {/* <Link to={"/object"}>Objets</Link>
                <Link to={"/summoner"}>Summoners</Link> */}
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse> */}
            </Container>
        </Navbar>

    </>;
}

export default NavBar;