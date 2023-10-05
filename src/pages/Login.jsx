import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoUV from "../assets/img/logo.png"
import { launchAlert } from "../utils/alerts";
//import { useUser } from "../context/useUser";
import { setKey } from "../utils/storage";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Estado para gestionar el mensaje de error
    //const {user,setUser} = useUser()
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userLog = {
        Email: email,
        Password: password
      }
      
      try{
        const response = await fetch(`${'http://localhost:1234'}/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLog)
        });

        if(response.ok){
          const {body} = await response.json()
          setKey('user', body)
          navigate('/')
        } else {
          const dataError = await response.json()
          throw new Error(dataError.body)
        }
      } catch (error) {
        launchAlert("Error con la solicitud", error, "error")
        setError("Error con el ingreso")
      }
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Card className="shadow p-4">
          <Container>
            <div className="d-flex flex-column align-items-center p-2 gap-3">
              <img src={LogoUV} width={120} alt="Logo de la aplicación" />
              <div className="text-center">
                <h2>AudioVisual</h2>
                <span>Software para Préstamos de equipos audiovisuales</span>
              </div>
            </div>
            <hr />
                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
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
  
              <Button variant="danger" type="submit">
                Iniciar sesión
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>¿No tienes una cuenta? </span>
              <Link to="/register">Regístrate aquí</Link>
            </div>
          </Container>
        </Card>
      </div>
    );
  }