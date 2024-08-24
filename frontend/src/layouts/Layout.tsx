import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuDropdown from "../components/Utils/MenuDropDown";
import { useAuth } from '../components/AuthContext';
import { useEffect, useState } from "react";
import axios from "axios";

const BackgroundColumn = styled.div`
    background-color: var(--primary);
   
    /* flex-basis: max(12%,15rem); */

    width: clamp(5rem, 20vw, 20rem);
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;


    position: fixed;

    z-index: 3;

    div{
        h1{
            text-align: center;
            color: white;
        }
    }
    ul{
        display: flex;
        flex-direction: column;
        gap: 2rem;
       
        div{
            
            padding: 1rem;
            transition: 0.6s all ease;
            cursor: pointer;
           
            a{
                text-decoration: none;
                color: white;
                font-weight: bold;

            }
            /* &:hover{
                background-color: var(--primary-alt);
            } */
        }
    }
`
const BackgroundView = styled.div`
    
   display: flex;
   flex-direction: column;

   position: relative;
   margin-left:  clamp(5rem, 20vw, 20rem);
   width:100%;

   z-index: 1;
  
`

const Flex = styled.div`
    display: flex;
    height: 100%;
    min-height: 100vh;
    
`

const Logo = styled.div`
    text-align: center;
    margin: 2rem;
    a{
  
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: var(--font-size-l);
        font-weight: 800;
    }

`

const ButtonContainer = styled.div`

    display: flex;
    justify-content: center;
    
    position: relative;
    
    margin-bottom: 2rem;

    button{
        color: var(--primary);
        background-color: white;
        font-weight: bold;
        padding: 0.8rem 5rem;

        transition: 0.7s all ease;
        &:hover{
            background-color: var(--primary-alt);
            color: white;
        }
    }

`

const BackgroundOutlet = styled.div`
    background-color: var(--grey-4);
    height: 100%;
    margin-top: 8vh;

`

const BackgroundUser = styled.div`

    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;
    

    position: fixed;
    background-color: white;
    
    height:8vh;
    z-index: 2;

    width: calc(100% - clamp(5rem, 20vw, 20rem));

    a{
        text-decoration: none;
        color: var(--primary-alt);
        margin-right: 2rem;
    }

`


const BackgroundLogoList = styled.div`

`

function Layout() {
    const navigate = useNavigate();
    const { userType, userEmail, logout } = useAuth(); // Obtener el tipo de usuario del contexto

    const navegarInicio = () => {
        navigate("/");
        logout();
    }


    const [permissions, setPermissions]: any = useState([]);

    //Falta denegar el acceso a ciertos links

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/type/get-permissions/${userType}`)
            .then((response) => {
                console.log(response.data.data)
                const permissions = response.data.data.map((value: any) => value.name_permissions);
                setPermissions(permissions)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])

    return (
        <>
            <Flex>
                <BackgroundColumn>
                    <BackgroundLogoList>
                        <Logo>
                            <Link to="/dashboard">ERP</Link>
                        </Logo>
                        <ul>
                            {permissions.includes("users") && (
                                <>
                                    <MenuDropdown name="Usuarios" data={[{ name: "Crear Permisos Usuarios", link: "create-permissions" }, { name: "Administrar Permisos", link: "manage-permissions" }, { name: "Crear Usuarios", link: "create-user" }, { name: "Administrar Usuarios", link: "manage-users" }]} />
                                </>
                            )}

                            {
                                permissions.includes("invoices") && (
                                    <>
                                        <MenuDropdown name="Facturacion" data={[{ name: "Crear Facturas", link: "create-invoice" }]} />
                                    </>
                                )
                            }
                            {
                                permissions.includes("customers") && (
                                    <>
                                        <MenuDropdown name="Clientes" data={[{ name: "Crear Cliente", link: "create-customer" }, { name: "Ver Clientes", link: "get-customers" }]} />
                                    </>
                                )
                            }
                            {
                                permissions.includes("products") && (
                                    <>
                                        <MenuDropdown name="Productos" data={[{ name: "Crear Producto", link: "create-product" }]} />
                                    </>
                                )
                            }

                        </ul>
                    </BackgroundLogoList>
                    <ButtonContainer>
                        <button type="submit" onClick={navegarInicio}>Salir</button>
                    </ButtonContainer>
                </BackgroundColumn>

                <BackgroundView>
                    <BackgroundUser>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                        <Link to="#">{userEmail}</Link>

                    </BackgroundUser>
                    <BackgroundOutlet>
                        <Outlet />
                    </BackgroundOutlet>
                </BackgroundView>
            </Flex>
        </>
    );
}

export default Layout;