import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuDropdown from "../components/Utils/MenuDropDown";

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

function AuthLayout() {
    return (
        <>
            <Flex>
                <BackgroundColumn>
                    <Logo>
                        <Link to="#">ERP</Link>
                    </Logo>
                    <ul>
                        <MenuDropdown name="Clientes" data={[{name:"opcion 1", link:"#"}, {name:"opcion 2",link:"#"}]}/>
                        <MenuDropdown name="Funcion 1" data={[{name:"opcion 1", link:"#"}, {name:"opcion 2",link:"#"}]}/>
                        
                      
                    </ul>
                    <div>
                        <button>salir</button>
                    </div>
                </BackgroundColumn>
                <Outlet />
            </Flex>
        </>
    );
}

export default AuthLayout;
