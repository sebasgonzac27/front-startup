import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Client } from '../layouts/Client';
import Select from 'react-select';

export function ClientRequest() {
  const [request, setRequest] = useState({
    StartTime: '',
    EndTime: '',
    ClassroomID: '',
    ActivityDescription: '',
    UserID: '', // El ID del usuario se tomará del token
    ProgramID: '',
  });

  const [tuTokenJWT, setTuTokenJWT] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzRjY0Rjg5LTVBNjAtMTFFRS1CNTk3LURDODVERUIxQkU0NCIsIkZ1bGxOYW1lIjoiQ2FybG9zIERpbmFtbyIsIkVtYWlsIjoiY2FybG9zLkRpbmFtb0Bjb3JyZW91bml2YWxsZS5lZHUuY28iLCJQYXNzd29yZCI6IiQyYiQxMiRYNjZ3czdvbXlnV1ZZMU8zMG5TWG8uYlNyVjJVc2tWWmdyNkoxZEwxS0tYaDRzM3E5bWxwYSIsIlBob25lIjoiMTIzMTQ0NDU2NTY3IiwiUm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE2OTY0NDQ1OTV9.5oknBke_uH1yh_7EDa6-UFOj4r4jh_OLSqlv5ZdPKyA'
      );

  const [classrooms, setClassrooms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {

    // Obtener la lista de salones desde la API
    fetch('http://localhost:1234/classrooms')
      .then((response) => response.json())
      .then((data) => {
        setClassrooms(data.body);
      })
      .catch((error) => {
        console.error('Error al cargar salones:', error);
      });
    // Obtener la lista de programas desde la API
    fetch('http://localhost:1234/programs')
      .then((response) => response.json())
      .then((data) => {
        setPrograms(data.body);
      })
      .catch((error) => {
        console.error('Error al cargar programas:', error);
      });
  }, []);

  // Agregué esta función para manejar el cambio en la selección de salón
  const handleClassroomChange = (selectedOption) => {
    setSelectedClassroom(selectedOption);
    setRequest({ ...request, ClassroomID: selectedOption.ID });
  };

  // Manejar el cambio en la selección de programa
  const handleProgramChange = (selectedOption) => {
    setSelectedProgram(selectedOption);
    setRequest({ ...request, ProgramID: selectedOption.ID });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Obtener el ID del usuario del token JWT
    const userIDFromToken = obtenerIDDelToken(tuTokenJWT);
  
    // Verificar si selectedClassroom y selectedProgram no son nulos
    if (selectedClassroom && selectedProgram) {
      const requestData = {
        ...request,
        UserID: userIDFromToken,
        ClassroomID: selectedClassroom.ID,
        ProgramID: selectedProgram.ID,
      };
  
      fetch('http://localhost:1234/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tuTokenJWT}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Solicitud creada con éxito:', data);
        })
        .catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
    } else {
      console.error('Debes seleccionar un salón y un programa antes de enviar la solicitud.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  // Función para extraer el ID del usuario del token JWT
  const obtenerIDDelToken = (token) => {
    try {
      // Decodificar el token JWT
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.ID;
    } catch (error) {
      console.error('Error al decodificar el token JWT:', error);
      return null;
    }
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
            <Form.Label>Salón</Form.Label>
            <Select
              value={selectedClassroom}
              onChange={handleClassroomChange}
              options={classrooms.map((classroom) => ({
                ID: classroom.ID,
                value: classroom.ClassroomName, // Cambié a ClassroomName
                label: classroom.ClassroomName, // Cambié a ClassroomName
              }))}
              placeholder="Selecciona un salón"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Programa</Form.Label>
            <Select
              value={selectedProgram}
              onChange={handleProgramChange}
              options={programs.map((program) => ({
                ID: program.ID,
                value: program.ProgramName, // Cambié a ProgramName
                label: program.ProgramName, // Cambié a ProgramName
              }))}
              placeholder="Selecciona un programa"
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
          <Button type="submit">Crear Solicitud</Button>
        </Form>
      </Container>
    </Client>
  );
}
