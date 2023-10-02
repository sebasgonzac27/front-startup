import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import {GenericModal} from '../components/GenericModal'
import { Admin } from "../layouts/Admin";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Users () {
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)

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
                    <h2>Usuarios <Badge bg="danger" className="fs-6">{users.length}</Badge></h2>
                </Stack>
                <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon type='solid' name='user-plus' color='#ffffff'></box-icon>Add User</Button>
                </div>
            <hr/>
            <PaginatedTable
            data={users}
            itemsPerPage={10}
            renderRow={(user) => (
                <>
                <td>{user.FullName}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.Role}</td>
                <td>
                    <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => console.log(user.ID)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                    </ButtonGroup>
                </td>
                </>
            )}
            headers={['Nombre', 'Email', 'Teléfono', 'Rol', 'Acciones']}
        />
        <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title="Agregar/Editar Elemento"
            initialValues={null} // Puedes proporcionar valores iniciales aquí
            onSubmit={handleSaveModal}
            fields={[
                { name: 'name', label: 'Nombre' },
                { name: 'email', label: 'Correo', type: 'email' },
                { name: 'phone', label: 'Teléfono' },
                // Agrega más campos aquí según tus necesidades
            ]}
        />
        </Container>
        </Admin>
        </>
    )
}