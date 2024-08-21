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



      </CardBackground>

    </>
  )
}

export default Dashboard;