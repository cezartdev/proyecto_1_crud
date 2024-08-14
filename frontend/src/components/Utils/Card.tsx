import styled from "styled-components"

const Background = styled.div`
    background-color: white;
    border-radius: var(--radius-m);
    padding: var(--padding-bt);

    h5{
        margin: 0;
    }
`


interface Card {
    title: string,
    msg: string
}


const Card: React.FC<Card> = ({ title, msg }) => {
    return (
        <>
            <Background>
                <h5>{title}</h5>
                <p>{msg}</p>


            </Background>
        </>
    )
}

export default Card