import styled from "styled-components"
import Dropdown from "../../components/Utils/Dropdown"

const Background = styled.div`

`

const Title = styled.h1`
    margin: 2rem auto;
    width: 95%;
`

function CreateUsers() {
    //TODO: Crear una validacion mejor 
    const opciones = ["Administrador", "Trabajador"];

    return (
        <>
            <Background>
                <Title>Crear Usuarios</Title>
                <form>
                    <input type="text" placeholder="Nombre" />
                    <input type="email" placeholder="Correo" />
                    <input type="text" placeholder="Contraseña" />
                    <div>
                        <Dropdown label="Tipo de usuario:" options={opciones} />
                    </div>
                </form>
            </Background>
        </>
    )
}

export default CreateUsers