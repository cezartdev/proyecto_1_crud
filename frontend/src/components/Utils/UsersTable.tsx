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

export default function UsersTable() {
    const [data, setData] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [dataPermissions, setDataPermissions] = useState<any[]>([]);
    const [dataAllPermissions, setDataAllPermissions] = useState<any[]>([]);
    const [userPermissions, setUserPermissions] = useState<{ [key: string]: boolean }>({});
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-all`)
            .then((response) => {
                const dataWithId = response.data.data.map((item: any, index: number) => ({
                    id: index,
                    ...item
                }));
                setData(dataWithId);
                setIsDeleted(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [isDeleted]);

    // Funciones para abrir/cerrar el modal de edición
    const handleOpenEditModal = (row: any) => {
        setSelectedRow(row);
        setOpenEdit(true);
        handleAllPermissions(); //Todos los permisos
        handleLoadingPermissions(row); //Permisos del tipo

    };

    const handleCloseEditModal = () => {
        setOpenEdit(false);
        setSelectedRow(null);
        setUserPermissions({});
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
        //console.log("Eliminando el tipo de usuario:", selectedRow);
        if (!selectedRow) return;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/type/delete/${selectedRow.name}`)
            .then((response) => {

                console.log(response.data.data)
                setIsDeleted(true); // Actualiza el estado para desencadenar useEffect
                setSelectedRow(null); // Resetea la fila seleccionada

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        handleCloseDeleteModal();
    };

    //Estos son los permisos de un tipo especifico
    const handleLoadingPermissions = (row: any) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-permissions/${row?.name}`)
            .then((response) => {
                const permissions = response.data.data.reduce((acc: any, item: any) => {
                    acc[item.name_permissions] = true;
                    return acc;
                }, {});
                setUserPermissions(permissions);
                setDataPermissions(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    const handleAllPermissions = () => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/permission/get-all`)
            .then((response) => {
                // const data = response.data.data;

                const dataPermissions = response.data.data.map((item: any, index: number) => ({
                    id: index,
                    ...item
                }));

                setDataAllPermissions(dataPermissions);

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

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

    const translate: any = {
        customers: {
            spanish: "Ver Clientes"
        },
        invoices: {
            spanish: "Ver Facturas"
        },
        products: {
            spanish: "Ver Productos"
        },
        users: {
            spanish: "Ver Usuarios"
        }
    }

    const handleCheckboxChange = (name: string) => {
        setUserPermissions(prevState => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    const handleEditSubmit = () => {
        // Recolecta los nombres de los permisos que están marcados
        const selectedPermissions = Object.keys(userPermissions).filter(permission => userPermissions[permission]);

        // Prepara el payload para enviar en la solicitud PATCH
        const payload = {
            typeName: selectedRow?.name, // Puedes enviar el nombre del tipo de usuario si es necesario
            permissions: selectedPermissions // Envía los nombres de los permisos seleccionados
        };

        // Realiza la solicitud PATCH para actualizar los permisos
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/type/edit-permissions`, payload)
            .then((response) => {
                console.log("Permisos actualizados correctamente:", response.data);
                // Puedes agregar alguna lógica adicional aquí, como cerrar el modal o actualizar la tabla de datos
                handleCloseEditModal();
            })
            .catch(error => {
                console.error("Error actualizando los permisos:", error);
            });
    };

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
                        width: "80vw",
                        maxWidth: "80rem",
                        height: "80vh",
                        bgcolor: 'background.paper',
                        borderRadius: "var(--radius-m)",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-modal-title">Editar Rol de "{selectedRow?.name}"</h2>
                    <p id="modal-modal-description">
                        Aquí puedes editar las propiedades del elemento seleccionado.

                    </p>
                    {/* Recorre e imprime los valores de dataPermissions */}
                    <div>
                        <h3>Permisos:</h3>
                        {dataAllPermissions.length > 0 ? (
                            <ul>
                                {dataAllPermissions.map((permission, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={!!userPermissions[permission.name]}
                                                onChange={() => handleCheckboxChange(permission.name)}
                                            />
                                            {" "}
                                            {translate[permission.name]?.spanish || permission.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay permisos disponibles o se están cargando.</p>
                        )}
                    </div>
                    <Button sx={{ backgroundColor: "var(--primary)", fontWeight: "bold", mr: "2rem" }} variant="contained" onClick={handleEditSubmit}>Editar</Button>
                    <Button sx={{ backgroundColor: "red", fontWeight: "bold" }} variant="contained" onClick={handleCloseEditModal}>Cerrar</Button>

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