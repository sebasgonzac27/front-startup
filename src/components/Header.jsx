import { Container, Nav, Navbar } from "react-bootstrap";
import { deleteKey } from '../utils/storage'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/useUser";

export function Header({brand,routes}) {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    return (
        <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href={brand.href} className="fw-bold">{brand.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {routes.map((route, index) => (
                <Nav.Link key={index} href={route.href}>{route.name}</Nav.Link>
              ))}
            </Nav>
            <Nav>
              <Nav.Link onClick={() => {setUser(null),deleteKey('user'); navigate('/login')}}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}