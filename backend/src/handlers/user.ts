import {Request,Response} from "express"
import User from "../models/User.model"
import bcrypt from "bcrypt"
import colors from "colors"

export const createUser = async (req: Request, res: Response) => {

    try {
        
        
        const user = await User.create(req.body)
        res.json({data: user })
        
    } catch (error) {
        
        res.status(400).json({response: error})
    }
    

}

export const getUser = async (req: Request, res: Response) => {
    
    // lógica para obtener el usuario
    res.json("getUser");
};

export const updateUser = async (req: Request, res: Response) => {
    // lógica para actualizar el usuario
    res.json("updateUser");
};

export const deleteUser = async (req: Request, res: Response) => {
    // lógica para eliminar el usuario
    res.json("deleteUser");
};

export const getAllUsers = async (req: Request, res: Response) => {
    // lógica para obtener el usuario
    res.json("getAllUsers");
};

export const loginValidate = async (req: Request, res: Response) => {
    // lógica para obtener el usuario
    try {
        const email = await req.body.email
        
        const user = await User.findOne({ where: { email} });
        //Esto representa los valores del usuario :user.dataValues
        //Ejemplo del id: user.dataValues.id

        if (!user) {
            return res.status(400).json({ response: {msg: "No existe el usuario" }});
        }

        const plainPassword = await req.body.password

        const hashedPassword = await user.dataValues.password

        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

        //En este punto isMatch devuelve true si es correcta la contraseña o false si no

        const userType = user.dataValues.type
        if(isMatch){
            res.status(200).json({response: {usertype: userType}});
        }else{
            // El mismo formato de errores
            // const errors = [{msg:"Usuario o contraseña incorrecta"}]
            res.status(400).json({response: {msg :"Usuario o contraseña incorrecta" }})
        }
    
    } catch (error) {
        console.log(colors.bgRed.white.bold(`${error}`));
        console.log(colors.bgRed.white.bold(`Error en el login del usuario`))
        res.status(400).json({response: error})
    }
};

