import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
const Title = styled.h1`
    margin: 0;
`
const Background = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem auto;
    width: 95%;
`


const NameType = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    input{
        background-color: var(--grey-4);
      
    }

    label{
        font-weight: bold;

    }
`
const OptionsPermissions = styled.div`
    display: flex;
    justify-content: space-between;

  
    label{
        p{
            margin: 0;
        }
    }

`

const Button = styled.div`
    display: flex;
    justify-content: center;

    input{
        background-color: var(--primary);
        color: white;
        font-weight: bold;
        cursor: pointer;
        
        transition: 0.7s all ease;

        &:hover{
            background-color: var(--primary-alt);
            scale: 1.05;
        }
    }

`
const Form = styled.form`
    

    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: var(--radius-m);
    padding: 2rem;

    width: 50%;


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
            <Background>

                <Title>Permisos</Title>
                <Form onSubmit={handleSubmit}>
                    <NameType>
                        <label>Rol o tipo de usuario</label>
                        <input type="text" placeholder="Nombre del tipo de usuario" />

                    </NameType>

                    <OptionsPermissions>
                        {names.map((name, index) => (
                            <label key={index}>  {/* Utiliza el `index` como clave */}
                                <input type="checkbox" id={`check${index}`} name={`${name}`} />
                                <p>{name}</p>
                            </label>
                        ))}
                    </OptionsPermissions>
                    <Button>

                        <input type="submit" value={"Enviar"} />
                    </Button>
                </Form>
            </Background>
        </>
    )
}

export default PermisosUsuarios