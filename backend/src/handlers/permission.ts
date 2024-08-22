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
        
        const {typeName, customers, invoices,products,users} = req.body

        // await Types.create({
        //     name: typeName
        // })




        // await Types_Permissions.create({
        //     where: {
        //         name_permissions: email,
        //         name_type: name
        //     }
        // });
        

        console.log(req.body)
        res.status(200).json(req.body)
        
    } catch (error) { 
        
        console.log(error)
        res.status(400).json({error})
    }

}