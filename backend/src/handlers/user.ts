import { Request, Response } from "express"
import User from "../models/Users.model"
import bcrypt from "bcrypt"
import Types from "../models/Types.model"
import Users_Types from "../models/Users_Types.model"
import Users from "../models/Users.model"
import { where } from "sequelize"

export const createUser = async (req: Request, res: Response) => {
    //Todos los errores a este punto son de Sequelize
    try {
        console.log(req.body)
        const { name, email, password, type } = req.body

        const user = await User.create({ email: email, name: name, password: password })


        await Users_Types.create({ email_users: email, name_type: type })

        res.status(200).json({ data: user })

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            error.msg = "Un usuario con ese correo ya existe"
        } else {
            error.msg = "Ocurrio un error inesperado"
        }

        res.status(400).json({ error })
    }

}



export const getUser = async (req: Request, res: Response) => {

    try {

        const email = req.params.email

        const user = await Users.findOne({ where: { email: email } })


        res.status(200).json({ data: user })

    } catch (error) {


        res.status(400).json({ error })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { email, newName, newEmail, newPassword } = req.body;

        // Crea un objeto para los valores a actualizar
        const updateFields: any = {};

        // Verifica cada campo y solo agrega aquellos que no son nulos, indefinidos o vacíos
        if (newName) updateFields.name = newName;
        if (newEmail) updateFields.email = newEmail;
        if (newPassword) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            updateFields.password = hashedPassword;
        }

        // Si no hay nada que actualizar, devuelve un mensaje
        if (Object.keys(updateFields).length === 0) {

            return res.status(400).json({ error: [{msg:"No hay campos válidos para actualizar."}]});
        }

        // Realiza la actualización
        await Users.update(updateFields, { where: { email } });

        // Obtiene los datos del usuario actualizado
        const user = await Users.findOne({ where: { email: newEmail || email } });

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {

        const email = req.params.email

        const user = await Users.findOne({ where: { email: email } })

        await Users_Types.destroy({ where: { email_users: email } })

        await Users.destroy({ where: { email: email } })


        res.status(200).json({ data: user })

    } catch (error) {


        res.status(400).json({ error })
    }
};

export const getAllUsers = async (req: Request, res: Response) => {

    try {


        const users = await Users.findAll()


        res.status(200).json({ data: users })

    } catch (error) {


        res.status(400).json({ error })
    }



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
