import { Container, Nav, Navbar } from "react-bootstrap";
import { deleteKey } from '../utils/storage'
import { useNavigate } from "react-router-dom";

export function ClientHeader() {
  const navigate = useNavigate();

  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/client" className="fw-bold">
          AudioVisual Cliente
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/client/requests">Mis Solicitudes</Nav.Link>
            <Nav.Link href="/client/create-request">Crear Solicitud</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => { deleteKey('auth'); navigate('/login') }}>
              Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
