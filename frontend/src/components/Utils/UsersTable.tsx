import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dropdown from './Dropdown';

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

const StyledTextField2 = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 'var(--radius-m)',
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
        transform: 'translate(5px, -18px) scale(0.8)',
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 14px',
    },
    '& .css-14lo706>span': {
        display: 'none'
    },
});

const StyledTextField3 = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 'var(--radius-m)',
        backgroundColor: '#f9f9f9',
        fontSize: '1.4rem',
        padding: 0,  // Elimina el relleno del contenedor
        margin: 0,   // Elimina el margen del contenedor
        '& fieldset': {
            borderColor: 'var(--primary)',
            borderWidth: '1px', // Asegúrate de que el borde tenga un ancho
            borderStyle: 'solid', // Asegúrate de que el borde sea sólido
        },
        '&:hover fieldset': {
            borderColor: 'var(--primary-alt)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--primary)',
        },
        '&.Mui-focused': {
            boxShadow: 'none',  // Elimina cualquier sombra en foco
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.4rem',
        color: '#666',
        transform: 'translate(5px, -20px) scale(1)',
        transition: 'all 0.3s ease',
        transformOrigin: 'top left',
    },
    '& .MuiInputLabel-root.Mui-focused, .MuiOutlinedInput-root:hover .MuiInputLabel-root': {
        color: 'var(--primary)',
        transform: 'translate(5px, -20px) scale(1)',
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 14px',
    },

    '& .css-14lo706>span': {
        display: 'none'
    },
});

export default function DataTable() {
    const [data, setData] = useState<any[]>([]);
    const [userRoles, setUserRoles] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-all`)
            .then((response) => {
                const users = response.data.data;
                const dataWithId = users.map((item: any, index: number) => ({
                    id: index,
                    ...item
                }));
                setData(dataWithId);
                setIsDeleted(false);
                setIsUpdate(false);

                // Obtener roles para cada usuario
                users.forEach((user: any) => {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-type/${user.email}`)
                        .then(roleResponse => {
                            const userType = roleResponse.data.data[0]?.name_type || "Sin Rol";
                            setUserRoles(prevRoles => ({
                                ...prevRoles,
                                [user.email]: userType,
                            }));
                        })
                        .catch(error => {
                            console.error(`Error fetching role for ${user.email}:`, error);
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [isDeleted, isUpdate]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenEditModal = (row: any) => {
        setSelectedRow(row);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setOpenEdit(true);
    };

    const handleCloseEditModal = () => {
        setOpenEdit(false);
        setSelectedRow(null);
    };

    const handleOpenDeleteModal = (row: any) => {
        setSelectedRow(row);
        setOpenDelete(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
        setIsUpdate(false);
        setSelectedRow(null);
    };

    const handleDelete = () => {
        if (!selectedRow) return;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${selectedRow.email}`)
            .then(() => {
                setIsDeleted(true);
                setSelectedRow(null);
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });

        handleCloseDeleteModal();
    };

    const handleEditSubmit = () => {
        const payload = {
            email: selectedRow?.email,
            newName: newName || selectedRow?.name, // Si no se ha actualizado, utiliza el valor actual
            newEmail: newEmail || selectedRow?.email,
            newPassword: newPassword || null,
            newType: type || selectedRow?.name_type // Asegúrate de enviar el tipo de usuario
        };

        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/edit-user`, payload)
            .then(() => {
                handleCloseEditModal();
                setIsUpdate(true);
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'email', headerName: 'Correo', width: 250 },
        {
            field: 'role',
            headerName: 'Rol',
            width: 150,
            renderCell: (params) => (
                <span>{userRoles[params.row.email] || 'Cargando...'}</span>
            ),
        },
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
    const [options, setOptions] = useState<string[]>([]);
    const [type, setType] = useState<string>('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-all`)
            .then((response) => {
                const optionsArray = response.data.data.map((value: any) => value.name);
                setOptions(optionsArray);

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const handleDropdownSelect = (selectedOption: string) => {
        setType(selectedOption);
    };
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
                        width: "70vw",
                        maxWidth: "70rem",
                        height: "90vh",
                        bgcolor: 'background.paper',
                        borderRadius: "var(--radius-m)",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-modal-title">Editar Usuario "{selectedRow?.name}"</h2>
                    <div>
                        <StyledTextField3
                            fullWidth
                            margin="normal"
                            label="Nombre Actual"
                            value={selectedRow?.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField3
                            fullWidth
                            margin="normal"
                            label="Correo Actual"
                            value={selectedRow?.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField3
                            fullWidth
                            margin="normal"
                            label="Rol Actual"
                            value={userRoles[selectedRow?.email] || 'Cargando...'}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField2
                            fullWidth
                            margin="normal"
                            label="Nuevo Nombre"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <StyledTextField2

                            fullWidth
                            margin="normal"
                            label="Nuevo Correo"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <StyledTextField2
                            fullWidth
                            margin="normal"
                            label="Nueva Contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Dropdown
                            label="Nuevo Rol o tipo de usuario:"
                            options={options}
                            onSelect={handleDropdownSelect}
                        />
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "50vw",
                        maxWidth: "70rem",
                        bgcolor: 'background.paper',
                        borderRadius: "var(--radius-m)",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h3 id="modal-modal-title">¿Estas seguro de que quieres eliminar al Usuario?<br />  "{selectedRow?.name}"</h3>

                    <div id='modal-buttons-div'>
                        <Button sx={{ backgroundColor: "var(--primary)", fontWeight: "bold", mr: "2rem" }} variant="contained" onClick={handleDelete}>Eliminar</Button>
                        <Button sx={{ backgroundColor: "red", fontWeight: "bold" }} variant="contained" onClick={handleCloseDeleteModal}>Cancelar</Button>
                    </div>
                </Box>
            </Modal>
        </Background>
    );
}