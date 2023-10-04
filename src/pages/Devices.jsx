import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import {GenericModal} from '../components/GenericModal'
import { Admin } from "../layouts/Admin";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Devices () {
    const [devices, setDevices] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [types, setTypes] = useState([])

    useEffect(() => {
        fetch(`${'http://localhost:1234'}/devices`)
        .then(res => res.json())
        .then(data => setDevices(data.body))
        .catch(err => console.log(err))
    }, [])

    ///to extract the campusName with the campusID
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
                    <h2>Equipo <Badge bg="danger" className="fs-6">{devices.length}</Badge></h2>
                </Stack>
                <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon type='solid' name='devices' color='#ffffff'></box-icon>Add Device</Button>
                </div>
            <hr/>
            <PaginatedTable
            data={devices}
            itemsPerPage={10}
            renderRow={(device) => (
                <>
                <td>{types.find(deviceType => deviceType.ID === device.DeviceTypeID)?.TypeName || 'Error: unregistered type of device'}</td>
                <td>{device.InventoryNumber}</td>
                <td>{device.IdentifierNumber}</td>
                <td>{device.DeviceStatus}</td>
                <td>
                    <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => console.log(device.ID)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                    </ButtonGroup>
                </td>
                </>
            )}
            headers={['Tipo de dispositivo', '# Inventario', '# Identificación', 'Estatus', 'Acciones']}
        />
        <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title="Agregar/Editar Elemento"
            initialValues={null} // Puedes proporcionar valores iniciales aquí
            onSubmit={handleSaveModal}
            fields={[
                { name: 'Device Type ID', label: 'Tipo de dispositivo' },
                { name: 'Inventory number', label: 'Número de Inventario' },
                { name: 'Identifier number', label: 'Número de Identificación' },
                { name: 'Device status', label: 'Estatus' },
                // Agrega más campos aquí según tus necesidades
            ]}
        />
        </Container>
        </Admin>
        </>
    )
}