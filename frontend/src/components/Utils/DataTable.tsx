import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import styled from 'styled-components';

const Background = styled.div`
    width: min(120rem, 100%);
    margin-top: 2rem;

    //titulo
    .css-t89xny-MuiDataGrid-columnHeaderTitle{
        
        font-size: 1.6rem;

    }

    .css-60ds9y-MuiDataGrid-root .MuiDataGrid-cell--textLeft{

        font-size: 1.2rem;

    }

    .css-levciy-MuiTablePagination-displayedRows{
        font-size: 1.2rem;
    }

`;

const columns = [
    { field: 'name', headerName: 'Nombre', width: 150 },

];

export default function DataTable() {
    const [data, setData] = useState<any[]>([]); // Asegúrate de definir el tipo de datos adecuado

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-all`) // Reemplaza con tu endpoint
            .then((response) => {
                // Añadir un id único a cada fila
                const dataWithId = response.data.data.map((item: any, index: number) => ({
                    id: index, // Usa un índice único o algún otro identificador
                    ...item
                }));
                setData(dataWithId);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                checkboxSelection
            />
        </Background>
    );
}