import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Client } from '../layouts/Client';
import { format } from 'date-fns';

export function DashboardRequest() {
  const [requests, setRequests] = useState([]);
  const [userID, setUserID] = useState(''); // Aquí almacena el ID del usuario del token

  useEffect(() => {
    // Obtener el ID del usuario del token JWT (puedes usar la misma función obtenerIDDelToken que mencionaste en tu código anterior)
    const tuTokenJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzRjY0Rjg5LTVBNjAtMTFFRS1CNTk3LURDODVERUIxQkU0NCIsIkZ1bGxOYW1lIjoiQ2FybG9zIERpbmFtbyIsIkVtYWlsIjoiY2FybG9zLkRpbmFtb0Bjb3JyZW91bml2YWxsZS5lZHUuY28iLCJQYXNzd29yZCI6IiQyYiQxMiRYNjZ3czdvbXlnV1ZZMU8zMG5TWG8uYlNyVjJVc2tWWmdyNkoxZEwxS0tYaDRzM3E5bWxwYSIsIlBob25lIjoiMTIzMTQ0NDU2NTY3IiwiUm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE2OTY0NDQ1OTV9.5oknBke_uH1yh_7EDa6-UFOj4r4jh_OLSqlv5ZdPKyA'; // Coloca aquí tu token JWT
    const userIDFromToken = obtenerIDDelToken(tuTokenJWT); // Asegúrate de implementar esta función adecuadamente

    if (userIDFromToken) {
      setUserID(userIDFromToken);

      // Realiza una solicitud GET al servidor para obtener las solicitudes del cliente
      fetch('http://localhost:1234/requests')
        .then((response) => response.json())
        .then((data) => {
          // Filtra las solicitudes basadas en el ID del usuario
          const filteredRequests = Array.isArray(data.body)
            ? data.body.filter((request) => request.UserID === userIDFromToken)
            : [];

          setRequests(filteredRequests);
        })
        .catch((error) => {
          console.error('Error al cargar las solicitudes:', error);
        });
    }
  }, []);

  
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
        <h2>Mis Solicitudes</h2>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Materia</th>
              <th>Fecha de Inicio</th>
              <th>Fecha Final</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.ActivityDescription}</td>
                <td>{format(new Date(request.StartTime), 'dd/MM/yyyy HH:mm')}</td>
                <td>{format(new Date(request.EndTime), 'dd/MM/yyyy HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Client>
  );
}
