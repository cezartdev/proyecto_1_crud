import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useAuth } from "./AuthContext";
import ErrorMessage from "./Utils/ErrorMessage";
import anime from "animejs";
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
                margin-bottom: 2rem;
            }

            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 2rem;

                

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
                transition: 0.5s all ease;
                &:hover{
                    background-color: var(--primary-alt);
                }
            }

            a {
                text-decoration: none;
                color: #3bc2bc;
            }
        }
    }
`;


const loadingAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const SubmitButton = styled.button<{ loading: boolean }>`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: ${(props) => (props.loading ? "#6c757d" : "#007bff")};
  border: none;
  border-radius: var(--radius-m);
  cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
  overflow: hidden;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.loading ? "#6c757d" : "#0056b3")};
  }
  ${(props) =>
        props.loading &&
        css`
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        background-size: 200% 100%;
        animation: ${loadingAnimation} 1.5s infinite;
      }
    `}
`;


function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email: string; password: string, other: string }>({
        email: "",
        password: "",
        other: ""
    });
    const navigate = useNavigate();
    const { login } = useAuth();
    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) {
            startLoadingAnimation();
        } else {
            stopLoadingAnimation();
        }
    }, [loading]);

    const startLoadingAnimation = () => {
        if (loadingRef.current) {
            anime({
                targets: loadingRef.current,
                translateX: [0, 250],
                easing: "easeInOutQuad",
                direction: "alternate",
                loop: true,
            });
        }
    };

    const stopLoadingAnimation = () => {
        if (loadingRef.current) {
            anime.remove(loadingRef.current);
        }
    };

    const Login = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                {
                    email,
                    password,
                }
            );

            console.log(data);

            login(data.token, data.response.userType, data.response.email); // Incluye el tipo de usuario y el email del usuario
            navigate("/dashboard");
        } catch (error: any) {
            let emailError = "";
            let passwordError = "";
            let otherError = "";

            if (error.response && error.response.data && error.response.data.errors) {
                console.log(error.response.data);
                error.response.data.errors.forEach((element: any) => {
                    if (element.path === "email" && !emailError) {
                        emailError = element.msg;
                    }

                    if (element.path === "password" && !passwordError) {
                        passwordError = element.msg;
                    }

                    if (element.path === undefined) {
                        otherError = element.msg;
                    }
                });
            }

            setErrors({
                email: emailError,
                password: passwordError,
                other: otherError
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundStyle>
            <form onSubmit={Login}>
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
                        {errors.other && <ErrorMessage msg={errors.other} />}
                        <label>Correo</label>
                        <input
                            type="text"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {errors.email && <ErrorMessage msg={errors.email} />}
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {errors.password && <ErrorMessage msg={errors.password} />}
                    </div>

                    <SubmitButton type="submit" loading={loading}>
                        Iniciar Sesión
                    </SubmitButton>
                    {loading}

                    <a href="#">¿No tienes una cuenta?</a>
                </fieldset>
            </form>
        </BackgroundStyle>
    );
}

export default FormLogin;