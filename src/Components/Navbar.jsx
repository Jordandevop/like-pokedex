import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TypesServices from '../Services/TypesServices';
import { useNavigate, useParams } from 'react-router-dom';
import GenerationsServices from '../Services/GenerationsServices';
import VersionsServices from '../Services/VersionsServices';
import HabitatService from '../Services/HabitatService';
import LocationsService from '../Services/LocationsService';

const NavBar = () => {

    const [types, SetTypes] = useState([]);
    const [generations, setGenerations] = useState([]);
    const [versions, setVersions] = useState([]);
    const [habitats, sethabitats] = useState([]);
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const navigateTo = (ver) => {
        navigate("/version/" + ver.name, { state: { "version": ver } });
    }

    const fetchTypes = async () => {
        try {
            const response = await TypesServices.GetAlltypes();
            SetTypes(response.data.results)

        } catch (error) {
            console.log(error);

        }
    }

    const fetchGenerations = async () => {
        try {
            const res = await GenerationsServices.getAllGenerations();
            setGenerations(res.data.results)

        } catch (error) {
            console.log(error);

        }
    }

    const fetchVersions = async () => {
        try {
            const resVersion = await VersionsServices.getAllVersions();

            setVersions(resVersion.data.results)


        } catch (error) {
            console.log(error);

        }
    }

    const fetchhabitats = async () => {
        try {
            const reshab = await HabitatService.getHabitat();
            sethabitats(reshab.data.results);

        } catch (error) {
            console.log(error);

        }
    }

    const fetchLocations = async () => {
        try {
            const resLoc = await LocationsService.getAllLocations();

            setLocations(resLoc.data.results);


        } catch (error) {
            log(error)
        }
    }
    useEffect(() => {
        fetchTypes();
        fetchGenerations();
        fetchVersions();
        fetchhabitats();
        fetchLocations();
    }, []);



    return <>


        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Pokemon</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">


                        <NavDropdown title="Types" id="basic-nav-dropdown">
                            {types && types.map((type) => {
                                return <NavDropdown.Item href={'/type/' + type.name} key={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Générations" id="basic-nav-dropdown">
                            {generations && generations.map((gen) => {
                                return <NavDropdown.Item href={'/generation/' + gen.name} key={gen.name}>{gen.name.charAt(0).toUpperCase() + gen.name.slice(1)}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Version de Jeu" id="basic-nav-dropdown">
                            {versions && versions.map((ver) => {

                                return <NavDropdown.Item href={'/version/' + ver.name} key={ver.name} onClick={() => navigateTo(ver.name)}>{ver.name.charAt(0).toUpperCase() + ver.name.slice(1)}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Habitat" id="basic-nav-dropdown">
                            {habitats && habitats.map((hab) => {
                                return <NavDropdown.Item href={'/habitat/' + hab.name} key={hab.name}>{hab.name.charAt(0).toUpperCase() + hab.name.slice(1)}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Localisation" id="basic-nav-dropdown">
                            {locations && locations.map((loc) => {
                                return <NavDropdown.Item href={'/location/' + loc.name} key={loc.name}>{loc.name.charAt(0).toUpperCase() + loc.name.slice(1)}</NavDropdown.Item>
                            })}

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </>;
}

export default NavBar;