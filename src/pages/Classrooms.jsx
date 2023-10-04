import React, { useState, useEffect } from "react";
import PaginatedTable from "../components/PaginatedTable";
import { GenericModal } from '../components/GenericModal';
import { Admin } from "../layouts/Admin";
import { Badge, Button, ButtonGroup, Container, Stack } from "react-bootstrap";

export function Classrooms() {
  const [classrooms, setClassrooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    fetch(`${'http://localhost:1234'}/classrooms`)
      .then(res => res.json())
      .then(data => setClassrooms(data.body))
      .catch(err => console.log(err))
  }, []);

  //to extract the campusName with the campusID
  useEffect(() => {
    fetch(`${'http://localhost:1234'}/campuses`)
      .then(res => res.json())
      .then(data => setCampuses(data.body))
      .catch(err => console.log(err))
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClassroom(null);
  }

  const handleEditClick = (classroom) => {
    setEditingClassroom(classroom);
    setShowModal(true);
  }

  const handleSaveModal = (editedData) => {
    // TODO: logica para editar la info
    handleCloseModal();
  }

  return (
    <>
      <Admin>
        <Container className="mt-4">
          <div className="d-flex justify-content-between">
            <Stack direction="horizontal" gap={2}>
              <h2>Salones<Badge bg="danger" className="fs-6">{classrooms.length}</Badge></h2>
            </Stack>
            <Button className="d-flex align-items-middle text-center p-2 btn-success gap-2" onClick={() => setShowModal(true)}><box-icon name='list-plus' color='#ffffff'></box-icon>Add Classroom</Button>
          </div>
          <hr />
          <PaginatedTable
            data={classrooms}
            itemsPerPage={10}
            renderRow={(classroom) => (
              <>
                <td>{classroom.ClassroomName}</td>
                <td>{campuses.find(campus => campus.ID === classroom.CampusID)?.CampusName || 'Error: unregistered campus'}</td>
                <td>
                  <ButtonGroup size="sm">
                    <Button className="btn-warning" onClick={() => handleEditClick(classroom)}><box-icon type='solid' name='edit'></box-icon></Button>
                    <Button className="btn-danger"><box-icon type='solid' name='trash' color='#ffffff'></box-icon></Button>
                  </ButtonGroup>
                </td>
              </>
            )}
            headers={['Nombre', 'Campus', 'Acciones']}
          />
          <GenericModal
            show={showModal}
            onHide={handleCloseModal}
            title={editingClassroom ? "Editar Salón" : "Agregar Salón"}
            initialValues={editingClassroom} // Pasa los datos del salón para editar (null si es una nueva adición)
            onSubmit={handleSaveModal}
            fields={[
              { name: 'ClassroomName', label: 'Nombre del salón' },
              { name: 'CampusID', label: 'ID del Campus' }
              // Agrega más campos aquí según tus necesidades
            ]}
          />
        </Container>
      </Admin>
    </>
  )
}



