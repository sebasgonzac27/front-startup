import { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';
import { Client } from '../layouts/Client';

export function ClientView(){
    const [requestsCount, setRequestsCount] = useState(0);
    const [createRequest, setCreateRequestCount] = useState(0);
  
    useEffect(() => {
        setRequestsCount(5);
        setCreateRequestCount(1);
    }, []);

    return(
        <Client>
           <Container className="mt-4">
      <h2>Dashboard Cliente</h2>
      <hr/>
      <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-3">
        <Col>
        <Link to='/client/requests' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon type='solid' name='user'></box-icon>
              <Card.Title>Mis Solicitudes</Card.Title>
              <Card.Text>{requestsCount}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
       
        <Col>
        <Link to='/client/create-request' className='text-decoration-none'>
          <Card>
            <Card.Body>
            <box-icon name='headphone' ></box-icon>
              <Card.Title>Crear una Solicitud</Card.Title>
                <Card.Text>{createRequest}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      </Row>
    </Container>
        </Client>
    )
}