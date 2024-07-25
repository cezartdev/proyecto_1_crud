import axios from "axios";

import styled from "styled-components";
import FormLogin from "../components/FormLogin";

const Main = styled.main`
    background-color: #eaeaea;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

function Login() {
    return (
        <>
            <Main role="main">
                <FormLogin />
            </Main>
        </>
    );
}

export default Login;
