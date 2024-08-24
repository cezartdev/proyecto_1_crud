import { Request, Response } from "express"
import Permissions from "../models/Permissions.model"
import Types from "../models/Types.model";
import Types_Permissions from "../models/Types_Permissions.model";

export const getAllTypes = async (req: Request, res: Response) => {
    
    try {

        const types = await Types.findAll();
        
        res.status(200).json({data: types})
    } catch (error) {
        res.status(400).json({error})
    }
};

export const getTypePermissions = async (req: Request, res: Response) => {
    
    try {
        const name = req.params.name;
        
        const typePermissions = await Types_Permissions.findAll({where:{ name_type: name}});
        
        res.status(200).json({data: typePermissions})
    } catch (error) {
        res.status(400).json({error})
    }
};


export const editTypePermissions = async (req: Request, res: Response) => {
    
    try {
        const body = req.body;

        console.log(body)
        
        res.status(200).json({data: "yes"})
    } catch (error) {
        res.status(400).json({error})
    }
};
