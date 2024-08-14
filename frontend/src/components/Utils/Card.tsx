import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';
import axios from 'axios';
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

const ModalStyle = styled(Modal)`

    background-color: white;
    width: 60%;
    border-radius: var(--radius-m);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 2rem;

    
    
    div{
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
       
    }
    h2{
        margin: 0;
        text-align: center;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        label{

            width: 50rem;
            h5{
                font-size: 2rem;
                margin: 1rem 0;

            }

            input{
                background-color: var(--grey-4);
                font-size: 2rem;
                width: 100%;
            }

            textarea{
                background-color: var(--grey-4);
                font-size: 2rem;

                height: 12rem;
                width: 100%;
            }

        }

        section{
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 0;

            button{
                background-color: var(--primary);
                color: white;
                font-weight: bold;
            }
        }
        
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
    editable?: boolean,
    buttonlink?: string
}

const Card: React.FC<Card> = ({ title, msg1, msg2, msg3, msg4, msg5, msg6, clickable, img, editable, buttonlink }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title,
        msg1: msg1 || '',
        msg2: msg2 || '',
        msg3: msg3 || '',
        msg4: msg4 || '',
        msg5: msg5 || '',
        msg6: msg6 || ''
    });
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implementar lógica para guardar los cambios
        console.log("Datos editados:", formData);

        const send = {
            petname: formData.title,
            code: formData.msg1,
            ownername: formData.msg2,
            description: formData.msg3,
            date: formData.msg4
        }

        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/patient/edit`,
                {
                    send
                }
            );
            console.log(data)
        } catch (error) {
            console.log(error)
        }


        closeModal();
    };



    return (
        <>
            <Background clickable={clickable}>

                {img ? <Img src={`${img}`} alt="No imagen" /> :
                    ""
                }

                <Content>

                    {editable ? <div><EditableButton onClick={openModal}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ballpen" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 6l7 7l-4 4" />
                        <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z" />
                        <path d="M4 20l1.768 -1.768" />
                    </svg></EditableButton></div> : ""}

                    <h5>{title}</h5>
                    {msg1 ? <p>Codigo: {msg1}</p> : ""}
                    {msg2 ? <p>Dueño: {msg2}</p> : ""}
                    {msg3 ? <p>Descripcion: {msg3}</p> : ""}
                    {msg4 ? <p>Fecha: {msg4}</p> : ""}
                    {msg5 ? <p>{msg5}</p> : ""}
                    {msg6 ? <p>{msg6}</p> : ""}
                </Content>
            </Background>

            <ModalStyle isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Edit Modal">
                <h2>Informacion</h2>

                <div>
                    {img ? <Img src={`${img}`} alt="No imagen" /> :
                        ""
                    }

                    <form onSubmit={handleSubmit}>
                        <label>
                            <h5>Codigo: {formData.msg1}</h5>
                        </label>
                        <label>
                            <h5>Nombre mascota</h5>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </label>

                        <label>
                            <h5>Dueño</h5>
                            <input name="msg2" value={formData.msg2} onChange={handleChange} />
                        </label>
                        <label>
                            <h5>Descripcion</h5>
                            <textarea name="msg3" value={formData.msg3} onChange={handleChange} />
                        </label>
                        <label>
                            <h5>Fecha ({msg4})</h5>
                            <input type='date' name="msg4" value={formData.msg4} onChange={handleChange} />
                        </label>
                        <section>
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={closeModal}>Cancelar</button>
                        </section>
                    </form>
                </div>
            </ModalStyle>
        </>
    )
}

export default Card