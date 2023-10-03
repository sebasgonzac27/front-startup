import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Client } from '../layouts/Client';
import { format } from 'date-fns';

export function DashboardRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener las solicitudes del cliente
    fetch('http://localhost:1234/requests')
      .then((response) => response.json())
      .then((data) => {
        // Asegúrate de que data sea un arreglo antes de actualizar el estado
        setRequests(Array.isArray(data.body) ? data.body : []);
      })
      .catch((error) => {
        console.error('Error al cargar las solicitudes:', error);
      });
  }, []);

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
