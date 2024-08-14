import styled, { keyframes } from 'styled-components';
import Card from "../../components/Utils/Card";
import axios from "axios";
import { useEffect, useState } from "react";



// Definir la animación de parpadeo
const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Estilos para el contenedor del Skeleton
const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Estilos para los elementos del Skeleton
const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${skeletonLoading} 1.5s infinite;
  border-radius: 4px;
`;

const SkeletonCard = styled(SkeletonElement)`
  height: 200px; /* Altura simulada del Card */
  margin-bottom: 20px;
`;

const SkeletonTitle = styled(SkeletonElement)`
  width: 150px;
  height: 20px;
`;

const SkeletonText = styled(SkeletonElement)`
  width: 80%;
  height: 16px;
`;

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
    const [loading, setLoading] = useState<boolean>(true);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <>
            <Title>Clientes</Title>

            <CardBackground>
                {loading ? (
                    <SkeletonWrapper>
                        <SkeletonCard />
                        <SkeletonTitle />
                        <SkeletonText />
                        <SkeletonText />
                    </SkeletonWrapper>
                ) : (
                    Array.isArray(clientes) && clientes.length > 0 ? (
                        clientes.map((cliente) => {
                            const formattedDate = new Date(cliente.date).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            });

                            return (
                                <Card
                                    key={cliente.id} // Asegúrate de incluir una clave única para cada Card
                                    title={`${cliente.petname}`}
                                    msg1={`Codigo: ${cliente.code}`}
                                    msg2={`Dueño: ${cliente.ownername} ${cliente.ownerlastname}`}
                                    msg3={`Descripcion: ${cliente.description}`}
                                    msg4={`Fecha: ${formattedDate}`}
                                    img={cliente.img}
                                    editable
                                />
                            );
                        })
                    ) : (
                        <p>No hay clientes disponibles.</p>
                    )
                )}
            </CardBackground>
        </>
    );
}

export default VerClientes;