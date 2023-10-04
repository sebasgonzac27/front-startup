import { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {Admin} from '../layouts/Admin'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';

export function Dashboard(){
    const [usersCount, setUsersCount] = useState(0);
    const [campusCount, setCampusCount] = useState(0);
    const [roomsCount, setRoomsCount] = useState(0);
    const [typesCount, setTypesCount] = useState(0);
    const [equipmentCount, setEquipmentCount] = useState(0);
    const [requestsCount, setRequestsCount] = useState(0);
  
    useEffect(() => {
      setUsersCount(50);
      setCampusCount(3);
      setRoomsCount(20);
      setTypesCount(23);
      setEquipmentCount(100);
      setRequestsCount(10);
    }, []);

    return(
        <Admin>
           <Container className="mt-4">
      <h2>Dashboard</h2>
      <hr/>
      <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-3">
        <Col>
        <Link to='/admin/users' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon type='solid' name='user'></box-icon>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>{usersCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col>
        <Link to='/admin/campuses' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='buildings' type='solid' ></box-icon>
              <Card.Title>Campus</Card.Title>
              <Card.Text>{campusCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col>
        <Link to='/admin/classrooms' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='graduation' type='solid' ></box-icon>
              <Card.Title>Salones</Card.Title>
              <Card.Text>{roomsCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col>
        <Link to='/admin/types' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='devices' type='solid' ></box-icon>
              <Card.Title>Categorías</Card.Title>
              <Card.Text>{typesCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col>
        <Link to='/admin/devices' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='headphone' ></box-icon>
              <Card.Title>Equipos</Card.Title>
              <Card.Text>{equipmentCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col>
        <Link to='/admin/requests' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='notepad' type='solid' ></box-icon>
              <Card.Title>Solicitudes</Card.Title>
              <Card.Text>{requestsCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      </Row>
    </Container>
        </Admin>
    )
}