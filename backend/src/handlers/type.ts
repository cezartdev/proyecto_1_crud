import { Request, Response } from "express"
import Permissions from "../models/Permissions.model"
import Types from "../models/Types.model";
import Types_Permissions from "../models/Types_Permissions.model";
import { where } from "sequelize";
import { body } from "express-validator";

export const getAllTypes = async (req: Request, res: Response) => {

    try {

        const types = await Types.findAll();

        res.status(200).json({ data: types })
    } catch (error) {
        res.status(400).json({ error })
    }
};

export const getTypePermissions = async (req: Request, res: Response) => {

    try {
        const name = req.params.name;

        const typePermissions = await Types_Permissions.findAll({ where: { name_type: name } });

        res.status(200).json({ data: typePermissions })
    } catch (error) {
        res.status(400).json({ error })
    }
};


export const editTypePermissions = async (req: Request, res: Response) => {
    try {
        const typeName = req.body.typeName;
        const newPermissions: Array<string> = req.body.permissions;
       
        // Elimina las relaciones actuales entre el tipo y los permisos
        await Types_Permissions.destroy({ where: { name_type: typeName } });

        // Crea nuevas relaciones basadas en los permisos proporcionados
        const creationPromises = newPermissions.map(permission => {
            return Types_Permissions.create({ name_permissions: permission, name_type: typeName });
        });

        // Espera a que todas las promesas de creación se completen
        await Promise.all(creationPromises);

        res.status(200).json({ data: { msg: "Permisos actualizados correctamente" } });
    } catch (error) {
        console.error("Error updating permissions:", error);
        res.status(400).json({ error: error.message });
    }
};


export const deleteType = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;

        console.log(name);
        await Types_Permissions.destroy({ where: { name_type: name } })
        await Types.destroy({where:{name:name}})

        res.status(200).json({ data: { msg: `tipo de usuario "${name}" eliminado` } });
    } catch (error) {

        res.status(400).json({ error });
    }
};
