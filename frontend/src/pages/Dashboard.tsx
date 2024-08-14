import Card from "../components/Utils/Card";
import styled from "styled-components";

const CardBackground = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(min(100%,15rem),1fr));
  gap: 2rem;
  
  margin: 0 auto;

  width: 95%;

`

const Title = styled.h1`
    margin: 2rem auto;
    width: 95%;


`

function Dashboard() {



  return (
    <>
      <Title>Bienvenido</Title>


      <CardBackground>

        <Card title="Uno" msg="Descripcion 1" />
        <Card title="Dos" msg="Descripcion 2" />
        <Card title="Tres" msg="Descripcion 3" />
        <Card title="Cuatro" msg="Descripcion 4" />

      </CardBackground>

    </>
  )
}

export default Dashboard;