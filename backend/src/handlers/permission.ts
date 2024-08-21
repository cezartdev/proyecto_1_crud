import {Request,Response} from "express"
import Permissions from "../models/Permissions.model"

export const getPermissions = async (req: Request, res: Response) => {
   
    try {
        
        const permissions = await Permissions.findAll();
        res.status(200).json({data: permissions })
        
    } catch (error) { 
        
        console.log(error)
        res.status(400).json({error})
    }

}