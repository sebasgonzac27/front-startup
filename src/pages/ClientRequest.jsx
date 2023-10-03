import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Client } from '../layouts/Client';

export function ClientRequest() {
  const [request, setRequest] = useState({
    StartTime: '',
    EndTime: '',
    ClassroomID: '',
    ActivityDescription: '',
    UserID: '',
    ProgramID: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Realiza una solicitud POST al servidor para crear la solicitud
    fetch('http://localhost:1234/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o redirigir a la vista de solicitudes del cliente
        console.log('Solicitud creada con éxito:', data);
      })
      .catch((error) => {
        console.error('Error al crear la solicitud:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  return (
    <Client>
    <Container className="mt-4">
      <h2>Crear Solicitud</h2>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="datetime-local"
            name="StartTime"
            value={request.StartTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha Final</Form.Label>
          <Form.Control
            type="datetime-local"
            name="EndTime"
            value={request.EndTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ID del Salón</Form.Label>
          <Form.Control
            type="number"
            name="ClassroomID"
            value={request.ClassroomID}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción de la Actividad</Form.Label>
          <Form.Control
            type="text"
            name="ActivityDescription"
            value={request.ActivityDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ID del Usuario</Form.Label>
          <Form.Control
            type="text"
            name="UserID"
            value={request.UserID}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ID del Programa</Form.Label>
          <Form.Control
            type="number"
            name="ProgramID"
            value={request.ProgramID}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Crear Solicitud</Button>
      </Form>
    </Container>
    </Client>
  );
}
