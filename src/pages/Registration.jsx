import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { launchAlert } from "../utils/alerts";

export function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      FullName: fullName,
      Email: email,
      Password: password,
      Phone: phone,
      Role: role
    }

    try {
      // Realiza la solicitud POST a la API para registrar al usuario
      const response = await fetch(`${'http://localhost:1234'}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // La solicitud fue exitosa, el usuario se registró correctamente
        navigate("/login"); // Redirige al usuario a la página de inicio de sesión
      } else {
        // La solicitud falló, muestra un mensaje de error
        const errorData = await response.json();
        throw new Error(errorData.body)
      }
    } catch (error) {
      launchAlert("Error al realizar la solicitud", error.message, "error")
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="shadow p-4">
        <Container>
          <div className="text-center">
            <h2>Registro</h2>
          </div>
          <hr />
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            <Form.Group controlId="formBasicFullName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Teléfono"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicRole">
              <Form.Label>Rol</Form.Label>
              <Form.Check
                type="radio"
                label="Estudiante"
                name="role"
                value="Student"
                checked={role === "Student"}
                onChange={handleRoleChange}
              />
              <Form.Check
                type="radio"
                label="Docente"
                name="role"
                value="Teacher"
                checked={role === "Teacher"}
                onChange={handleRoleChange}
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Registrarse
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span>¿Ya tienes una cuenta? </span>
            <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </Container>
      </Card>
    </div>
  );
}
