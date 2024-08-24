import {Request,Response} from "express"
import User from "../models/Users.model"
import bcrypt from "bcrypt"
import Types from "../models/Types.model"
import Users_Types from "../models/Users_Types.model"

export const createUser = async (req: Request, res: Response) => {
    //Todos los errores a este punto son de Sequelize
    try {
        console.log(req.body)
        const {name,email,password,type} = req.body

        const user = await User.create({email:email,name:name,password:password})
  

        await Users_Types.create({email_users: email, name_type:type })

        res.status(200).json({data: user })
        
    } catch (error) { 
        if(error.name=== "SequelizeUniqueConstraintError"){
          error.msg = "Un usuario con ese correo ya existe"
        }else{
            error.msg = "Ocurrio un error inesperado"
        }
        
        res.status(400).json({error})
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
    try {
        const { email, password } = req.body;

        // Encuentra el usuario por email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const errors = [{ msg: "Usuario o contraseña incorrecta" }];
            return res.status(400).json({ errors });
        }

        const hashedPassword = user.dataValues.password;

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            const errors = [{ msg: "Usuario o contraseña incorrecta" }];
            return res.status(400).json({ errors });
        }

        // Obtener el tipo de usuario
        const userTypeRecord = await Users_Types.findOne({
            where: { email_users: email },
            attributes: ['name_type'],
        });

        let userType = 'Unknown'; // Valor por defecto si no se encuentra el tipo de usuario

        if (userTypeRecord) {
            userType = userTypeRecord.dataValues.name_type;
        }

        // Responder con el tipo de usuario y el email
        res.status(200).json({ response: { userType, email } });
        
    } catch (error) {
        console.error('Error en el login del usuario:', error);
        const errors = [{ msg: "Error al ingresar" }];
        res.status(400).json({ errors });
    }
};
