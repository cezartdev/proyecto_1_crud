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
