import styled from "styled-components";
import Dropdown from "../../components/Utils/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";

const Background = styled.div`
    margin: 2rem auto;
    width: 95%;
`;

const Title = styled.h1`
   
`;

const Form = styled.form`
    background-color: white;
    padding: 2rem;
    border-radius: var(--radius-m);

    max-width: 70rem;
    div{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    div:nth-child(1){
        input{
            background-color: var(--grey-4);
        }
    }

    div:nth-child(2){

    }

    div:nth-child(3){
        input{

            background-color: var(--primary);
            color: white;
            font-weight: bold;
        }

    }

`

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
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <input type="text" placeholder="Nombre" onChange={(e) => { setName(e.target.value); }} />
                        <input type="email" placeholder="Correo" onChange={(e) => { setEmail(e.target.value); }} />
                        <input type="text" placeholder="Contraseña" onChange={(e) => { setPassword(e.target.value); }} />
                    </div>
                    <div>
                        <Dropdown label="Tipo de usuario:" options={options} onSelect={handleDropdownSelect} />
                    </div>
                    <div>
                        <input type="submit" value={"Enviar"} />
                    </div>
                </Form>
            </Background>
        </>
    );
}

export default CreateUsers;