import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuDropdown from "../components/Utils/MenuDropDown";
import { useAuth } from '../components/AuthContext';

const BackgroundColumn = styled.div`
    background-color: var(--primary);
   
    flex-basis: max(12%,15rem);
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
    flex-basis: 100%;

`

const BackgroundUser = styled.div`

    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;

    margin: 2rem;

    a{
        text-decoration: none;
        color: var(--primary-alt);
    }

`

const BackgroundView = styled.div`
    
   display: flex;
   flex-direction: column;
   width: 100%;

`

const Url = styled.div`
    width: 95%;
    margin: 0 auto;
    color: var(--grey-1);

    
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

    // const url = location.pathname

    // let words: Array<string> = []

    // words = url.split("/")
    // words.shift()

    // console.log(words)
    return (
        <>
            <Flex>
                <BackgroundColumn>
                    <BackgroundLogoList>
                        <Logo>
                            <Link to="/dashboard">VET</Link>
                        </Logo>
                        <ul>

                            {userType === 'admin' && (
                                <MenuDropdown name="Admin Panel" data={[{ name: "Usuarios", link: "user-settings" }]} />
                            )}
                            <MenuDropdown name="Clientes" data={[{ name: "Ver Clientes", link: "get-customers" }]} />

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
                        {/* <Url>
                            {words.map((value) => (
                                <Link key={value} to={`/${value}`}>{`${value}`}</Link>
                            ))}
                        </Url> */}
                        <Outlet />
                    </BackgroundOutlet>
                </BackgroundView>
            </Flex>
        </>
    );
}

export default Layout;