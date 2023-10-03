import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import {GenericModal} from '../components/GenericModal'
import { Admin } from "../layouts/Admin";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Classrooms () {
    const [classrooms, setClassrooms] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetch(`${'http://localhost:1234'}/classrooms`)
        .then(res => res.json())
        .then(data => setClassrooms(data.body))
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
                    <h2>Salones<Badge bg="danger" className="fs-6">{classrooms.length}</Badge></h2>
                </Stack>
                <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon name='list-plus' color='#ffffff'></box-icon>Add Classroom</Button>
                </div>
            <hr/>
            <PaginatedTable
            data={classrooms}
            itemsPerPage={10}
            renderRow={(classroom) => (
                <>
                <td>{classroom.ClassroomName}</td>
                <td>{classroom.CampusID}</td>
                <td>
                    <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => console.log(classroom.ID)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                    </ButtonGroup>
                </td>
                </>
            )}
            headers={['Nombre','Campus ID', 'Acciones']}
        />
        <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title="Agregar/Editar Elemento"
            initialValues={null} // Puedes proporcionar valores iniciales aquí
            onSubmit={handleSaveModal}
            fields={[
                { name: 'nombre', label: 'Nombre' },
                { name: 'CampusID', label: 'ID del Campus' }
                // Agrega más campos aquí según tus necesidades
            ]}
        />
        </Container>
        </Admin>
        </>
    )
}