import styled from "styled-components"
import UsersTable from "../../components/Utils/UsersTable"

const Title = styled.h1`
    margin: 0;
`
const Background = styled.div`

    margin: 2rem auto;
    width: 95%;
`

function AdministrarUsuarios() {
    return (
        <>
            <Background>
                <Title>Administrar Usuarios</Title>
                <UsersTable />

            </Background>
        </>
    )
}

export default AdministrarUsuarios