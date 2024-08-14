import styled from 'styled-components';

interface Background {
    clickable?: boolean
}

const Background = styled.a<Background>`
    background-color: white;
    border-radius: var(--radius-m);
    padding: var(--padding-bt);

    cursor: ${props => props.clickable ? "pointer" : ""};

    display: flex;
    align-items: center;
    gap: 2rem;

    h5{
        margin: 0;
    }
`




const Img = styled.img`

   width:20rem;
   height:20rem;
   

    object-fit: cover;
    object-position: center;
    border-radius: 50%;


`
const EditableButton = styled.button`
    background-color: var(--primary);

    width: 4rem;
    height: 4rem;
    svg{
        stroke: white;
        width: 100%;
        height: 100%;
        background-color: transparent;
        scale: 1.5;
    }



`

const Content = styled.div`
    width: 100%;



    div{
        display: flex;
        justify-content: end;

    }

`


interface Card {
    title?: string,
    msg1?: string,
    msg2?: string,
    msg3?: string,
    msg4?: string,
    msg5?: string,
    msg6?: string,
    clickable?: boolean,
    img?: string,
    editable?: boolean
}

const Card: React.FC<Card> = ({ title, msg1, msg2, msg3, msg4, msg5, msg6, clickable, img, editable }) => {
    return (
        <>
            <Background clickable={clickable}>

                {img ? <Img src={`${img}`} alt="No imagen" /> :
                    ""
                }

                <Content>

                    {editable ? <div><EditableButton> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ballpen" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 6l7 7l-4 4" />
                        <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z" />
                        <path d="M4 20l1.768 -1.768" />
                    </svg></EditableButton></div> : ""}

                    <h5>{title}</h5>
                    {msg1 ? <p>{msg1}</p> : ""}
                    {msg2 ? <p>{msg2}</p> : ""}
                    {msg3 ? <p>{msg3}</p> : ""}
                    {msg4 ? <p>{msg4}</p> : ""}
                    {msg5 ? <p>{msg5}</p> : ""}
                    {msg6 ? <p>{msg6}</p> : ""}
                </Content>





            </Background>
        </>
    )
}

export default Card