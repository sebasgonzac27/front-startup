import { Container, Nav, Navbar } from "react-bootstrap";
import { deleteKey } from '../utils/storage'
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate()
    return (
        <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/admin" className="fw-bold">AudioVisual</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/users">Usuarios</Nav.Link>
              <Nav.Link href="/admin/campuses">Campus</Nav.Link>
              <Nav.Link href="/admin/classrooms">Salones</Nav.Link>
              <Nav.Link href="/admin/types">Categorías</Nav.Link>
              <Nav.Link href="/admin/devices">Equipos</Nav.Link>
              <Nav.Link href="/admin/requests">Solicitudes</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => {deleteKey('auth'); navigate('/login')}}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}