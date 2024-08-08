import styled from "styled-components"

const Background = styled.div`
    margin: 0;
    p{
        margin: 0;
        color: red;
    }

`
interface ErrorMessage{
    msg: string
}


const ErrorMessage: React.FC<ErrorMessage> = ({msg}) => {
  return (
    <>
        <Background>
            <p>{msg}</p>
        </Background>
    </>
  )
}

export default ErrorMessage