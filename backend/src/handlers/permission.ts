import {Request,Response} from "express"
import Permissions from "../models/Permissions.model"
import Types from "../models/Types.model";
import Types_Permissions from "../models/Types_Permissions.model";

export const getPermissions = async (req: Request, res: Response) => {
   
    try {
        
        const permissions = await Permissions.findAll();
        res.status(200).json({data: permissions })
        
    } catch (error) { 
        
        console.log(error)
        res.status(400).json({error})
    }

}

export const create = async (req: Request, res: Response) => {
    try {
        const { typeName, customers, invoices, products, users } = req.body;

        // Crear el tipo de usuario
        const newType = await Types.create({ name: typeName });

        // Función auxiliar para crear las relaciones
        const createTypePermission = async (permissionName: string) => {
            const permission = await Permissions.findOne({
                where: { name: permissionName },
            });

            if (permission && newType) {

                await Types_Permissions.create({
                    name_permissions: permission.name,
                    name_type: newType.name,
                });
            } else {
                console.error(`Error: Permiso '${permissionName}' o tipo de usuario no encontrado.`);
                if (!permission) console.error(`Permiso '${permissionName}' no encontrado.`);
                if (!newType) console.error(`Tipo de usuario '${typeName}' no fue creado correctamente.`);
            }
        };

        // Verificar y crear relaciones según los permisos
        if (customers) await createTypePermission('customers');
        if (invoices) await createTypePermission('invoices');
        if (products) await createTypePermission('products');
        if (users) await createTypePermission('users');

        res.status(200).json({ response: {msg: "Rol o tipo de usuario creado correctamente"} });

    } catch (error) {

        if(error.name === "SequelizeUniqueConstraintError"){
            error.msg = "El tipo de usuario ya existe"
        }
        console.log(error);
        res.status(400).json({ error });
    }
}