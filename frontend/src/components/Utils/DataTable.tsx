import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Background = styled.div`
    width: min(120rem, 100%);
    margin-top: 2rem;

    .css-t89xny-MuiDataGrid-columnHeaderTitle {
        font-size: 1.6rem;
    }

    .css-60ds9y-MuiDataGrid-root .MuiDataGrid-cell--textLeft {
        font-size: 1.2rem;
    }

    .MuiDataGrid-row {
        transition: all 0.5s ease;
    }

    .css-levciy-MuiTablePagination-displayedRows {
        font-size: 1.2rem;
    }
`;

export default function DataTable() {
    const [data, setData] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-all`)
            .then((response) => {
                const dataWithId = response.data.data.map((item: any, index: number) => ({
                    id: index,
                    ...item
                }));
                setData(dataWithId);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Funciones para abrir/cerrar el modal de edición
    const handleOpenEditModal = (row: any) => {
        setSelectedRow(row);
        setOpenEdit(true);
    };

    const handleCloseEditModal = () => {
        setOpenEdit(false);
        setSelectedRow(null);
    };

    // Funciones para abrir/cerrar el modal de eliminación
    const handleOpenDeleteModal = (row: any) => {
        setSelectedRow(row);
        setOpenDelete(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
        setSelectedRow(null);
    };

    // Función para manejar la eliminación (aquí puedes hacer una solicitud a tu API)
    const handleDelete = () => {
        // Aquí iría la lógica para eliminar el tipo de usuario seleccionado
        console.log("Eliminando el tipo de usuario:", selectedRow);
        handleCloseDeleteModal();
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre', width: 150 },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenEditModal(params.row)}
                >
                    Editar
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDeleteModal(params.row)}
                >
                    Eliminar
                </Button>
            ),
        },
    ];

    return (
        <Background>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5]}
                // Eliminar checkboxSelection para quitar los checkboxes
            />
            {/* Modal de edición */}
            <Modal
                open={openEdit}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-modal-title">Editar {selectedRow?.name}</h2>
                    <p id="modal-modal-description">
                        Aquí puedes editar las propiedades del elemento seleccionado.
                    </p>
                    <Button onClick={handleCloseEditModal}>Cerrar</Button>
                </Box>
            </Modal>
            {/* Modal de confirmación de eliminación */}
            <Modal
                open={openDelete}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-delete-title"
                aria-describedby="modal-delete-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-delete-title">¿Estás seguro?</h2>
                    <p id="modal-delete-description">
                        ¿Estás seguro de que quieres eliminar este tipo de usuario?
                    </p>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ mr: 2 }}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCloseDeleteModal}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Modal>
        </Background>
    );
}