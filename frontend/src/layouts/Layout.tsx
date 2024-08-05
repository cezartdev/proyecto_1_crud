import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
function AuthLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthLayout;
