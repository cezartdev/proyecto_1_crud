import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavBar from "../components/Utils/NavBar.jsx";
function AuthLayout() {
    return (
        <>
            <NavBar
                $links={[
                    { text: "Pagina 1", url: "/pagina1" },
                    { text: "Pagina 2", url: "/pagina2" },
                    { text: "Pagina 3", url: "/pagina3" },
                ]}
                $img={"/Logo.png"}
            />
            <Outlet />
        </>
    );
}

export default AuthLayout;
