import styled from "styled-components"

interface Background {
    clickable?: boolean
}

const Background = styled.a<Background>`
    background-color: white;
    border-radius: var(--radius-m);
    padding: var(--padding-bt);

    cursor: ${props => props.clickable ? "pointer" : ""};

    h5{
        margin: 0;
    }
`


interface Card {
    title?: string,
    msg?: string,
    clickable?: boolean,
    img?: string
}

const Img = styled.img`

    width: 10rem;
    height: 10rem;

    object-fit: cover;
    object-position: center;
    border-radius: 50%;

`


const Card: React.FC<Card> = ({ title, msg, clickable, img }) => {
    return (
        <>
            <Background clickable={clickable}>
                
                {img ? <Img src={`/Golden-Retriever.webp`} alt="No imagen" /> :
                    ""
                }

                <h5>{title}</h5>
                <p>{msg}</p>



            </Background>
        </>
    )
}

export default Card