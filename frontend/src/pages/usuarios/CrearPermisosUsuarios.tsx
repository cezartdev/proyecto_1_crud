import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ErrorMessage from "../../components/Utils/ErrorMessage"
const Title = styled.h1`
    margin: 0;
`
const Background = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem auto;
    width: 95%;
`


const NameType = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    input{
        background-color: var(--grey-4);
      
    }

    label{
        font-weight: bold;

    }
`
const OptionsPermissions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h6{
        font-weight: bold;
        margin: 0;
    
    }
    div{
        display: flex;
        gap: 2rem;
        label{
            display: flex;
            gap: 1rem;
          
       
            p{
                margin: 0;
            }
        }
    }
    

`

const Button = styled.div`
    display: flex;
    justify-content: center;

    input{
        background-color: var(--primary);
        color: white;
        font-weight: bold;
        cursor: pointer;
        
        transition: 0.7s all ease;

        &:hover{
            background-color: var(--primary-alt);
            scale: 1.05;
        }
    }

`
const Form = styled.form`
    

    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: var(--radius-m);
    padding: 2rem;
    max-width: 70rem;


`


function PermisosUsuarios() {

    const [names, setNames] = useState<string[]>([]);
    const [typeName, setTypeName] = useState<string>("");
    const [checkboxValues, setCheckboxValues] = useState({
        customers: false,
        invoices: false,
        products: false,
        users: false
    });

    console.log(names)

    const [errors, setErrors] = useState<{ typeName: string; permissions: string, otherError: string }>({
        typeName: "",
        permissions: "",
        otherError: ""
    });

    const handlePermissions = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/permission/get-all`
        );

        const namesArray = data.data.map((e: any) => e.name);
        setNames(namesArray);
    };

    useEffect(() => {
        handlePermissions();
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCheckboxValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/permission/create`,
                {
                    typeName,
                    customers: checkboxValues.customers,
                    invoices: checkboxValues.invoices,
                    products: checkboxValues.products,
                    users: checkboxValues.users

                }
            );

            console.log(data)

        } catch (error: any) {
            let typeName = "";
            let otherError = "";
            let permission = "";
            if (error.response && error.response.data && error.response.data.errors) {

                error.response.data.errors.forEach((element: any) => {
                    if (element.path === "typeName" && !typeName) {
                        typeName = element.msg;
                    }

                    if (element.path === "") {

                        permission = element.msg
                    }

                    if (element.path === undefined) {
                        otherError = element.msg;
                    }


                });

            }

            if (error.response.data.error != undefined) {
                otherError = error.response.data.error.msg
            }

            setErrors({
                typeName: typeName,
                permissions: permission,
                otherError: otherError
            });
        }
    }
    const translate: any = {
        customers: {
            spanish: "Ver Clientes"
        },
        invoices: {
            spanish: "Ver Facturas"
        },
        products: {
            spanish: "Ver Productos"
        },
        users: {
            spanish: "Ver Usuarios"
        }
    }


    return (
        <>
            <Background>
                <Title>Crear Permisos</Title>
                <Form onSubmit={handleSubmit}>
                    {errors.otherError && <ErrorMessage msg={errors.otherError} />}
                    <NameType>
                        <label>Nombre del rol o tipo de usuario</label>
                        {errors.typeName && <ErrorMessage msg={errors.typeName} />}
                        <input type="text" placeholder="Nombre del tipo de usuario" onChange={(e) => { setTypeName(e.target.value.toLowerCase()) }} value={typeName.toLowerCase()} />
                    </NameType>

                    <OptionsPermissions>
                        <h6>Permisos</h6>
                        {errors.permissions && <ErrorMessage msg={errors.permissions} />}
                        <div>
                            {Object.keys(checkboxValues).map((name, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        id={`check${index}`}
                                        name={name}
                                        checked={checkboxValues[name as keyof typeof checkboxValues]}
                                        onChange={handleCheckboxChange}
                                    />
                                    <p>{translate[name]?.spanish || name}</p>
                                </label>
                            ))}
                        </div>
                    </OptionsPermissions>
                    <Button>

                        <input type="submit" value={"Crear Tipo de usuario"} />
                    </Button>
                </Form>
            </Background>
        </>
    )
}

export default PermisosUsuarios