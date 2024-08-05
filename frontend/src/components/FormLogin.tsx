import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./AuthContext";
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
    const navigate = useNavigate();
    const { login } = useAuth();

    const EnviarEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                {
                    email,
                    password,
                }
            );
            console.log(data);
            console.log(data.response.usertype);
            login(data.token);
            navigate("/dashboard");
        } catch (error : any) {
            console.log(error.response.data);
        }
    };

    return (
        <>
            <BackgroundStyle>
                <form onSubmit={EnviarEmail}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#000000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                                type="password"
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
