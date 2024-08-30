import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line, Pie, Bar } from "react-chartjs-2";
import UsersTable from "../components/Utils/UsersTable";
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
} from 'chart.js';
import axios from "axios";

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
);

const CardBackground = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
  gap: 4rem;
  margin: 0 auto;
  width: 95%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 2rem;
    border-radius: var(--radius-m);

    h2 {
        color: var(--primary);
        font-size: var(--font-size-s);
        text-align: center;
        margin: 0;
        margin-bottom: 1rem;
    }

    label {
        margin-bottom: 1rem;
    }

    select, input {
        margin-top: 0.5rem;
    }
  }

  div:nth-child(2) {
    div {
        padding: 0;
        width: 100%;

        canvas {
            max-width: 26rem !important;
            max-height: 26rem !important;
        }
    }
  }
`;

const StyledTitle = styled.h1`
  margin: 2rem auto;
  width: 95%;
  text-align: center;
`;

const Background = styled.div`
    width: 95%;
    margin: 0 auto;
    margin-bottom: 4rem;
`;

function Dashboard() {
    const { userType } = useAuth();
    const [permissions, setPermissions] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState<"daily" | "weekly">("daily");
    const [productCount, setProductCount] = useState(5);
    const [monthsToShow, setMonthsToShow] = useState(3); // Filtro para número de meses (barras)

    // Estados para guardar datos iniciales
    const [initialLineData, setInitialLineData] = useState<number[]>([]);
    const [initialPieData, setInitialPieData] = useState<number[]>([]);
    const [initialBarData, setInitialBarData] = useState<number[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-permissions/${userType}`)
            .then((response) => {
                const permissions = response.data.data.map((value: any) => value.name_permissions);
                setPermissions(permissions);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        // Generar datos iniciales aleatorios solo una vez
        setInitialLineData(Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)));
        setInitialPieData(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
        setInitialBarData(Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)));
    }, [userType]);

    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeRange(event.target.value as "daily" | "weekly");
    };

    const handleProductCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductCount(Number(event.target.value));
    };

    const handleMonthsToShowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonthsToShow(Number(event.target.value));
    };

    const filteredLineData = {
        labels: timeRange === "daily"
            ? Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`)
            : Array.from({ length: 4 }, (_, i) => `Semana ${i + 1}`),
        datasets: [
            {
                label: `Ganancias ${timeRange === "daily" ? "Diarias" : "Semanales"} del Mes`,
                data: timeRange === "daily"
                    ? initialLineData
                    : initialLineData.reduce((weeks, value, index) => {
                        const weekIndex = Math.floor(index / 7);
                        weeks[weekIndex] = (weeks[weekIndex] || 0) + value;
                        return weeks;
                    }, [] as number[]),
                fill: false,
                borderColor: "#3bc2bc",
                tension: 0.1,
            },
        ],
    };

    const filteredPieData = {
        labels: Array.from({ length: productCount }, (_, i) => `Producto ${i + 1}`),
        datasets: [
            {
                label: "Porcentaje",
                data: initialPieData.slice(0, productCount),
                backgroundColor: ["#3bc2bc", "#31a39e", "#f56b2a", "#f1c40f", "#e74c3c"],
            },
        ],
    };

    const filteredBarData = {
        labels: Array.from({ length: monthsToShow }, (_, i) => `Mes ${i + 1}`),
        datasets: [
            {
                label: "Meses",
                data: initialBarData.slice(0, monthsToShow),
                backgroundColor: "#3bc2bc",
            },
        ],
    };

    return (
        <>
            <StyledTitle>Bienvenido</StyledTitle>

            <CardBackground>
                <div>
                    <h2>Ganancias</h2>
                    <label>
                        Mostrar ganancias:
                        <select value={timeRange} onChange={handleTimeRangeChange}>
                            <option value="daily">Diarias</option>
                            <option value="weekly">Semanales</option>
                        </select>
                    </label>
                    <Line data={filteredLineData} />
                </div>
                <div>
                    <h2>Productos Más Vendidos</h2>
                    <label>
                        Número de productos a mostrar:
                        <input
                            type="number"
                            value={productCount}
                            onChange={handleProductCountChange}
                            min="1"
                            max="10"
                        />
                    </label>
                    <Pie data={filteredPieData} />
                </div>
                <div>
                    <h2>Ganancias Últimos Meses</h2>
                    <label>
                        Número de meses a mostrar:
                        <input
                            type="number"
                            value={monthsToShow}
                            onChange={handleMonthsToShowChange}
                            min="1"
                            max="12"
                        />
                    </label>
                    <Bar data={filteredBarData} />
                </div>
            </CardBackground>

            {permissions.includes("users") && (
                <Background>
                    <h3>Editar Usuarios</h3>
                    <UsersTable />
                </Background>
            )}
        </>
    );
}

export default Dashboard;