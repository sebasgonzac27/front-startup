import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Client } from '../layouts/Client';
import { format } from 'date-fns';
import { useContext } from 'react';
import { UserContext } from '../context/useUser';

export function DashboardRequest() {
  const [requests, setRequests] = useState([]);
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    // Obtener el ID del usuario del token JWT (puedes usar la misma función obtenerIDDelToken que mencionaste en tu código anterior)
    const userIDFromToken = obtenerIDDelToken(user.token); // Asegúrate de implementar esta función adecuadamente

    if (userIDFromToken) {
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
  });

  
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
