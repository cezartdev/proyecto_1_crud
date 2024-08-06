import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuDropdown from "../components/Utils/MenuDropDown";
import { useAuth } from '../components/AuthContext';

const BackgroundColumn = styled.div`
    background-color: var(--primary);
   
    flex-basis: max(12%,15rem);
    height: 100vh;
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
            
            padding: 1.5rem;
            text-align: center;
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
const Flex = styled.div`
    display: flex;
    
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
    
    

    button{
        color: var(--primary);
        background-color: white;
        font-weight: bold;
        padding: 0.8rem 5rem;
    }

`

function Layout() {
    const navigate = useNavigate();
    const { userType } = useAuth(); // Obtener el tipo de usuario del contexto

    const navegarInicio = () => {
        navigate("/");
    }

    return (
        <>
            <Flex>
                <BackgroundColumn>
                    <Logo>
                        <Link to="/dashboard">ERP</Link>
                    </Logo>
                    <ul>
                        {userType === 'admin' && (
                            <MenuDropdown name="Admin Panel" data={[{name:"Admin Settings", link:"admin-settings"}, {name:"User Management",link:"user-management"}]} />
                        )}
                        <MenuDropdown name="Clientes" data={[{name:"Ver Clientes", link:"get-customers"}, {name:"Opción 2",link:"#"}]} />
                        <MenuDropdown name="Función 1" data={[{name:"Opción 1", link:"#"}, {name:"Opción 2",link:"#"}]} />
                    </ul>
                    <ButtonContainer>
                        <button type="submit" onClick={navegarInicio}>Salir</button>
                    </ButtonContainer>
                </BackgroundColumn>
                <div>
                    <div>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                        <a href="#">Link 4</a>
                        <a href="#">Link 5</a>
                    </div>
                    <Outlet />
                </div>
            </Flex>
        </>
    );
}

export default Layout;