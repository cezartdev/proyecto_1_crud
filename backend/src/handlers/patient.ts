import {Request,Response} from "express"
import Patient from "../models/Patient.model"
import bcrypt from "bcrypt"
import colors from "colors"


export const createPatient = async (req: Request, res: Response) => {
    
    try {

        console.log(req.body)
        
        const patient = await Patient.create(req.body)
        res.status(200).json({data: patient })
        
    } catch (error) { 
        res.status(400).json({error})
    }
    

}


export const getAllPatients = async (req: Request, res: Response) => {
    
    try {

        const allPatients = await Patient.findAll()
        
        console.log(allPatients)
        res.status(200).json({data: allPatients})
        
    } catch (error) { 
        res.status(400).json({error})
    }
    

}


export const editPatient = async (req: Request, res: Response) => {
    
    try {
        
        console.log(req.body)
        

        

        res.status(200).json({data: "recibido"})
        // const code = req.body.code

        // const patient = await Patient.findOne({ where: { code} })
        
        // console.log(patient)

        // res.status(200).json({data: "si"})
        
    } catch (error) { 
        res.status(400).json({error})
    }
    

}