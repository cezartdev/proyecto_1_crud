import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt";
import Types from "../models/Types.model";
import { UniqueConstraintError, where } from "sequelize";
import Users from "../models/Users.model";
import Users_Types from "../models/Users_Types.model";

export const handleInputErrors = async (req: Request, res: Response, next: NextFunction) => {
    
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const handlePasswordEncrypt = async (req: Request, res: Response, next: NextFunction) => {

    const saltRounds = 10;
    const { password } = req.body;
    try {
        // Genera el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Reemplaza la contraseña en el cuerpo de la solicitud con el hash
        req.body.password = hashedPassword;

        // Continúa al siguiente middleware o controlador
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: { msg: "Error encrypting password" } });
    }
}

export const handleUserTypeValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtén solo los nombres de la tabla "Types"
        const types = await Types.findAll({
            attributes: ['name'],
        });

        // Extrae los nombres en un arreglo simple
        const typeNames = types.map(type => type.dataValues.name);

        const { type } = req.body;

        // Verifica si el tipo de usuario existe en el arreglo
        if (!typeNames.includes(type)) {
            return res.status(400).json({ msg: "Tipo de usuario no permitido" });
        } 
           
        next()
       
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}