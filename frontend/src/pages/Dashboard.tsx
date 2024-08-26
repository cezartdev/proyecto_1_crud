import styled from "styled-components";
import { Line, Pie, Bar } from "react-chartjs-2";
import UsersTable from "../components/Utils/UsersTable"
import { useAuth } from '../components/AuthContext';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BubbleController, // Usa BubbleController en lugar de BubbleElement

} from 'chart.js';
import { useEffect, useState } from "react";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BubbleController, // Registro del controlador de burbujas
    // Registro del elemento de burbujas
);

const CardBackground = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
  gap: 4rem;
  margin: 0 auto;
  width: 95%;

  div{
    display: flex;
    flex-direction: column;
 
    align-items: center;
    background-color: white;
    padding: 2rem;
    border-radius: var(--radius-m);

    h2{
        color: var(--primary);
    }
  }

  div:nth-child(2){

    canvas{
        max-width: 50rem !important;
        max-height: 50rem !important;
      
    }

  }
`;

const StyledTitle = styled.h1`
  margin: 2rem auto;
  width: 95%;
  text-align: center;
`;

const chartDataLine = {
    labels: Array.from({ length: 10 }, (_, i) => `Dia ${i + 1}`),
    datasets: [
        {
            label: "Ganancias Diaria del mes",
            data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
            fill: false,
            borderColor: "#3bc2bc",
            tension: 0.1,
        },
    ],
};

const chartDataPie = {
    labels: ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"],
    datasets: [
        {
            label: "Porcentaje",
            data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
            backgroundColor: ["#3bc2bc", "#31a39e", "#f56b2a", "#f1c40f", "#e74c3c"],
        },
    ],
};

const chartDataBar = {
    labels: ["Barra 1", "Barra 2", "Barra 3"],
    datasets: [
        {
            label: "Meses",
            data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)),
            backgroundColor: "#3bc2bc",
        },
    ],
};

// Generar datos aleatorios para el gráfico de burbujas
// const generateRandomBubbleData = (count: any) => {
//     return Array.from({ length: count }, () => ({
//         x: Math.floor(Math.random() * 100),
//         y: Math.floor(Math.random() * 100),
//         r: Math.floor(Math.random() * 20) + 5 // Radio entre 5 y 25
//     }));
// };

// const chartDataBubble = {
//     datasets: [
//         {
//             label: "Datos de Burbujas",
//             data: generateRandomBubbleData(50), // 50 datos aleatorios
//             backgroundColor: "#3bc2bc",
//             borderColor: "#31a39e",
//             borderWidth: 1,
//         }
//     ]
// };

const Background = styled.div`
    width: 95%;
    margin: 0 auto;
    margin-bottom: 4rem;

`

function Dashboard() {

    const { userType } = useAuth();

    const [permissions, setPermissions]: any = useState([]);

    //Falta denegar el acceso a ciertos links
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-permissions/${userType}`)
            .then((response) => {

                const permissions = response.data.data.map((value: any) => value.name_permissions);
                setPermissions(permissions)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])

    return (
        <>
            <StyledTitle>Bienvenido</StyledTitle>

            <CardBackground>
                <div>
                    <h2>Ganancias</h2>
                    <Line data={chartDataLine} />
                </div>
                <div>
                    <h2>Productos Mas vendidos</h2>
                    <Pie data={chartDataPie} />
                </div>
                <div>
                    <h2>Ganancias Ultimos tres meses</h2>
                    <Bar data={chartDataBar} />
                </div>

            </CardBackground>
            {permissions.includes("users") && (
                <Background>
                    <h3>Editar Usuarios</h3>
                    <UsersTable />
                </Background>
            )
            }


        </>
    );
}

export default Dashboard;