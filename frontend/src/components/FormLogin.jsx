import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const BackgroundStyle = styled.div`
    width: var(--section-center);
    margin: 0 auto;
    display: flex;

    align-items: center;
    justify-content: center;
    form {
        background-color: white;
        border-radius: var(--radius-m);
        width: 50rem;
        height: 55rem;

        svg {
            border: 2px solid #3bc2bc;
            border-radius: 50%;
            position: relative;
            left: 53%;
            top: 8rem;

            scale: 1.8;
            stroke: #3bc2bc;
            transform: translate(-50%, -50%);
        }

        fieldset {
            margin: 8rem;
            legend {
                color: #3bc2bc;
            }

            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 2rem;

                margin-top: 2rem;

                color: #3bc2bc;
                input {
                    padding: var(--radius-m);
                    background-color: var(--grey-4);
                }
            }

            button {
                background-color: #3bc2bc;
                color: white;
                font-weight: bold;
                width: 100%;
                margin-top: 2rem;
                margin-bottom: 2rem;
            }

            a {
                text-decoration: none;
                color: #3bc2bc;
            }
        }
    }
`;

function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const EnviarEmail = async (e) => {
        e.preventDefault();

        let urlBackend = "/api/login-users";

        try {
            const { data } = await axios.post(`${urlBackend}`, {
                email,
                password,
            });
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <BackgroundStyle>
                <form onSubmit={EnviarEmail}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-user"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <fieldset>
                        <legend>Inicio de Sesión</legend>
                        <div>
                            <label>Correo</label>
                            <input
                                type="text"
                                placeholder="Correo"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label>Contraseña</label>
                            <input
                                type="text"
                                placeholder="Contraseña"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>

                        <button>Iniciar Sesión</button>

                        <a href="#">¿No tienes una cuenta?</a>
                    </fieldset>
                </form>
            </BackgroundStyle>
        </>
    );
}

export default FormLogin;
