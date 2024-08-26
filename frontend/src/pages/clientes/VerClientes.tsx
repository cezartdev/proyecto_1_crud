import styled from 'styled-components';




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






            </CardBackground>
        </>
    );
}

export default VerClientes;