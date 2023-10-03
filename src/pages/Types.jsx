import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import {GenericModal} from '../components/GenericModal'
import { Admin } from "../layouts/Admin";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Types () {
    const [types, setTypes] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetch(`${'http://localhost:1234'}/devicetypes`)
        .then(res => res.json())
        .then(data => setTypes(data.body))
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
                    <h2>Categorías<Badge bg="danger" className="fs-6">{types.length}</Badge></h2>
                </Stack>
                <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon name='category' color='#ffffff'></box-icon>Add Category</Button>
                </div>
            <hr/>
            <PaginatedTable
            data={types}
            itemsPerPage={10}
            renderRow={(category) => (
                <>
                <td>{category.TypeName}</td>             
                
                <td>
                    <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => console.log(category.ID)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                    </ButtonGroup>
                </td>
                </>
            )}
            headers={['Categoría', 'Acciones']}
        />
        <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title="Agregar/Editar Elemento"
            initialValues={null} // Puedes proporcionar valores iniciales aquí
            onSubmit={handleSaveModal}
            fields={[
                { name: 'name', label: 'Nombre' }
                // Agrega más campos aquí según tus necesidades
            ]}
        />
        </Container>
        </Admin>
        </>
    )
}