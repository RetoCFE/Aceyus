import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Layout = () => {
  return (
    <>
      <Navbar className=" navBar" class="" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Benceyus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">Monitoreo</Nav.Link>
              <NavDropdown title="Bases de Datos" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/monitoreodiscos">Discos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/monitoreolistener">Listener</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/monitoreologs">Logs</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/monitoreosmcc">SMCC</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/monitoreoinformix">Informix</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet>

        </Outlet>
      </section>

    </>


  );
};

export default Layout;



