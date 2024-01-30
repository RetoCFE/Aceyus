import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownButton } from 'react-bootstrap';
import RetoWare from '../img/RetoWare.png';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import Reloj from '../reloj/reloj';

const img = {
    width: '70px'
}

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Verifica si existe la cookie al inicializar
            isLoggedIn: !!Cookies.get('token'),
        };
    }

    handleLogout = () => {
        Cookies.remove('token');
        this.setState({ isLoggedIn: false });
        window.location.href = '/';
        // Eliminar un valor del localStorage
        localStorage.removeItem('user');

    };

    render() {

        const { isLoggedIn } = this.state;
        const myValue = localStorage.getItem('user');


        // const fechaFormateada = this.formatearFecha(this.state.currentDate);

        return (
            <>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><img style={img} src={RetoWare} alt="Orion" />Orion</NavbarBrand>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <Reloj />
                        </NavItem>
                        <NavItem>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                        </NavItem>
                        <NavItem>
                            <div>
                                {isLoggedIn ? (
                                    // Si el usuario está autenticado, muestra el dropdown
                                    <Dropdown drop="start">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {myValue}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Perfil</Dropdown.Item>
                                            <Dropdown.Item onClick={this.handleLogout}>Cerrar sesión</Dropdown.Item>
                                            {/* Otros elementos del dropdown */}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                ) : (
                                    // Si el usuario no está autenticado, no muestra el boton
                                    <div>
                                        {/* <Reloj /> */}
                                    </div>
                                )}
                            </div>
                        </NavItem>
                        <span>&nbsp;&nbsp;&nbsp;</span>

                    </Nav>
                </Navbar>

            </ >
        );
    }

}
export default NavigationBar;
