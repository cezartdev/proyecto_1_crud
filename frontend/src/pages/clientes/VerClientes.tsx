import styled from 'styled-components';
import axios from "axios";
import { useEffect, useState } from "react";



const CardBackground = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(min(100%,55rem), 1fr));
  gap: 2rem;
  
  margin: 0 auto;

  width: 95%;

`

const Title = styled.h1`
    margin: 2rem auto;
    width: 95%;


`
interface Cliente {
    id: number;
    code: number;
    ownername: string;
    ownerlastname: string;
    petname: string;
    description: string;
    img: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

function VerClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);


    const getClientes = async () => {
        try {
            const response = await axios.get<{ data: Cliente[] }>(
                `${import.meta.env.VITE_BACKEND_URL}/api/patient/get-all`
            );
            const data = response.data.data;

            if (Array.isArray(data)) {
                setClientes(data);
            } else {
                console.error('La respuesta no es un array:', data);
                setClientes([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <>
            <Title>Clientes</Title>

            <CardBackground>






            </CardBackground>
        </>
    );
}

export default VerClientes;