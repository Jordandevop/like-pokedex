import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TypesServices from '../Services/TypesServices';
import { useParams } from 'react-router-dom';

const NavBar = () => {

    const [types, SetTypes] = useState([]);

    const fetchTypes = async () => {
        try {
            const response = await TypesServices.GetAlltypes();

            SetTypes(response.data.results)

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchTypes()
    }, []);

    return <>


        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Pokemon</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title="Types" id="basic-nav-dropdown">
                            {types && types.map((type) => {
                                return <NavDropdown.Item href={'/type/' + type.name} key={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</NavDropdown.Item>
                            })}

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </>;
}

export default NavBar;