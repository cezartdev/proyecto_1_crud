import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
const Title = styled.h1`
    margin: 2rem auto;
    width: 95%;
`

function PermisosUsuarios() {

    const [names, setNames] = useState<string[]>([]);

    const handlePermissions = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/permission/get-all`
        );

        const namesArray = data.data.map((e: any) => e.name);
        setNames(namesArray);
    };

    useEffect(() => {
        handlePermissions();
    }, []);


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/...`
        );


    }

    return (
        <>
            <Title>Permisos</Title>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre del tipo de usuario" />


                {names.map((name, index) => (
                    <label key={index}>  {/* Utiliza el `index` como clave */}
                        <input type="checkbox" id={`check${index}`} name={`${name}`} />
                        <p>{name}</p>
                    </label>
                ))}

                <input type="submit" value={"Enviar"} />
            </form>
        </>
    )
}

export default PermisosUsuarios