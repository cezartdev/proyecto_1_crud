import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 'var(radius-m)',
        backgroundColor: '#f9f9f9',
        fontSize: '1.4rem',
        '& fieldset': {
            borderColor: 'var(--primary)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--primary-alt)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--primary)',
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.4rem',
        color: '#666',
        transition: 'all 0.3s ease',
        transformOrigin: 'top left',
    },
    '& .MuiInputLabel-root.Mui-focused, .MuiOutlinedInput-root:hover .MuiInputLabel-root': {
        color: 'var(--primary)',
        transform: 'translate(50px, -10px) scale(0.8)',
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 14px',
    },
});


export default function DataTable() {
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenEditModal = (row: any) => {
        setSelectedRow(row);
        setOpenEdit(true);
        handleAllPermissions();
        handleLoadingPermissions(row);
    };

    const handleCloseEditModal = () => {
        setOpenEdit(false);
        setSelectedRow(null);
        setUserPermissions({});
    };

    const handleOpenDeleteModal = (row: any) => {
        setSelectedRow(row);
        setOpenDelete(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
        setSelectedRow(null);
    };

    const handleDelete = () => {
        if (!selectedRow) return;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/type/delete/${selectedRow.name}`)
            .then((response) => {
                setIsDeleted(true);
                setSelectedRow(null);

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        handleCloseDeleteModal();
    };

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

    const handleCheckboxChange = (name: string) => {
        setUserPermissions(prevState => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    const handleEditSubmit = () => {
        const selectedPermissions = Object.keys(userPermissions).filter(permission => userPermissions[permission]);

        const payload = {
            typeName: selectedRow?.name,
            permissions: selectedPermissions
        };

        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/type/edit-permissions`, payload)
            .then((response) => {
                handleCloseEditModal();
            })
            .catch(error => {
                console.error("Error actualizando los permisos:", error);
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
                    id='button-edit'
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
                    id='button-delete'
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

    return (
        <Background>
            <StyledTextField
                id='search-name'
                label="Buscar por nombre"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: "2rem" }}
            />
            <DataGrid
                rows={filteredData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5]}
            />
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
                        height: "60vh",
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
                    <div id='modal-permissions-div'>
                        <h3>Permisos</h3>
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
                    <div id='modal-buttons-div'>
                        <Button sx={{ backgroundColor: "var(--primary)", fontWeight: "bold", mr: "2rem" }} variant="contained" onClick={handleEditSubmit}>Editar</Button>
                        <Button sx={{ backgroundColor: "red", fontWeight: "bold" }} variant="contained" onClick={handleCloseEditModal}>Cerrar</Button>
                    </div>
                </Box>
            </Modal>
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
                        width: "60vw",
                        maxWidth: "70rem",
                        height: "40vh",
                        bgcolor: 'background.paper',
                        borderRadius: "var(--radius-m)",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-delete-title">¿Estás seguro?</h2>
                    <p id="modal-delete-description">
                        ¿Estás seguro de que quieres eliminar este tipo de usuario?
                    </p>
                    <Button
                        id='button-edit-2'
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ backgroundColor: "var(--primary)", mr: "2rem" }}
                    >
                        Eliminar
                    </Button>
                    <Button
                        id='button-delete-2'
                        variant="contained"
                        onClick={handleCloseDeleteModal}
                        sx={{ backgroundColor: "red" }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Modal>
        </Background>
    );
}
