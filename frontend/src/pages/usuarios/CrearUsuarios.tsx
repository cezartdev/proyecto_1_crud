import styled from "styled-components";
import Dropdown from "../../components/Utils/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";

const Background = styled.div``;

const Title = styled.h1`
    margin: 2rem auto;
    width: 95%;
`;

function CreateUsers() {
    const [options, setOptions] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");

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

    const handleSubmit = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/create`, { name, email, password, type })
            .then((response) => {
                // Maneja la respuesta aquí
                console.log(response.data.data)
            })
            .catch(error => {

                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <Background>
                <Title>Crear Usuarios</Title>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <input type="text" placeholder="Nombre" onChange={(e) => { setName(e.target.value); }} />
                    <input type="email" placeholder="Correo" onChange={(e) => { setEmail(e.target.value); }} />
                    <input type="text" placeholder="Contraseña" onChange={(e) => { setPassword(e.target.value); }} />
                    <div>
                        <Dropdown label="Tipo de usuario:" options={options} onSelect={handleDropdownSelect} />
                    </div>
                    <input type="submit" value={"Enviar"} />
                </form>
            </Background>
        </>
    );
}

export default CreateUsers;