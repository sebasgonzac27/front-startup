import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import {GenericModal} from '../components/GenericModal'
import { Admin } from "../layouts/Admin";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Requests () {
    const [requests, setRequests] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetch(`${'http://localhost:1234'}/requests`)
        .then(res => res.json())
        .then(data => setRequests(data.body))
        .catch(err => console.log(err))
    }, [])

    //to extract the classroomName with the classroomID
    useEffect(() => {
        fetch(`${'http://localhost:1234'}/classrooms`)
        .then(res => res.json())
        .then(data => setClassrooms(data.body))
        .catch(err => console.log(err))
    }, [])

    //to extract the usernameName with the UserID
    useEffect(() => {
        fetch(`${'http://localhost:1234'}/users`)
        .then(res => res.json())
        .then(data => setUsers(data.body))
        .catch(err => console.log(err))
    }, [])

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSaveModal = (data) => {
        console.log(data)
    }
    return(
        <>
        <Admin>
            <Container className="mt-4">
                <div className="d-flex justify-content-between">
                <Stack direction="horizontal" gap={2}>
                    <h2>Solicitudes <Badge bg="danger" className="fs-6">{requests.length}</Badge></h2>
                </Stack>
                <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon type='solid' name='plus-circle' color='#ffffff'></box-icon>Add Requests</Button>
                </div>
            <hr/>
            <PaginatedTable
            data={requests}
            itemsPerPage={10}
            renderRow={(requests) => (
                <>
                <td>{requests.RequestDate}</td>
                <td>{requests.StartTime}</td>
                <td>{requests.EndTime}</td>
                <td>{classrooms.find(classroom => classroom.ID === requests.ClassroomID)?.ClassroomName || 'Error: unregistered classroom'}</td>
                <td>{requests.ActivityDescription}</td>
                <td>{requests.RequestStatus}</td>
                <td>{users.find(user => user.ID === requests.UserID)?.FullName || 'Error: unregistered user'}</td>
                <td>{requests.ProgramID}</td>
                <td>
                    <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => console.log(requests.ID)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                    </ButtonGroup>
                </td>
                </>
            )}
            headers={['Fecha de Solicitud', 'Fecha Inicial', 'Fecha Final', 'Salón', 'Descripción', 'Estatus', 'Usuario', 'Programa', 'Acciones']}
        />
        <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title="Agregar/Editar Elemento"
            initialValues={null} // Puedes proporcionar valores iniciales aquí
            onSubmit={handleSaveModal}
            fields={[
                { name: 'StartTime', label: 'Fecha inicial', type: 'datetime'},
                { name: 'EndTime', label: 'Fecha final', type: 'datetime'},
                { name: 'ClassroomID', label: 'ID salón de clases' },
                { name: 'ActivityDescription', label: 'Descripción' },
                { name: 'RequestStatus', label: 'Estatus' },
                { name: 'UserID', label: 'UserID' },
                { name: 'ProgramID', label: 'ProgramID' },
                // Agrega más campos aquí según tus necesidades
            ]}
        />
        </Container>
        </Admin>
        </>
    )
}