import styled from "styled-components";
import Card from "../../components/Utils/Card";

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


function VerClientes() {
    return (
        <>

            <Title>Clientes</Title>


            <CardBackground>
                <Card title="dsa" msg="asd" clickable />
                <Card title="Nombre" msg="Hola" img="das" />
                <Card title="dsa" msg="asd" />
                <Card title="dsa" msg="asd" />
            </CardBackground>

        </>
    )
}

export default VerClientes;