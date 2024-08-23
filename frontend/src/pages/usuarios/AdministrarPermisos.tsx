import styled from "styled-components"
import DataTable from "../../components/Utils/DataTable"

const Title = styled.h1`
    margin: 0;
`
const Background = styled.div`

    margin: 2rem auto;
    width: 95%;
`

function AdministrarPermisos() {
    return (
        <>
            <Background>
                <Title>Administrar Permisos</Title>

                <DataTable />
            </Background>
        </>
    )
}

export default AdministrarPermisos