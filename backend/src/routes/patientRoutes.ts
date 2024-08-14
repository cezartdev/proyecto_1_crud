import {Router} from "express"
import {body} from "express-validator"
import {createPatient, getAllPatients,editPatient} from "../handlers/patient"
import { handleInputErrors} from "../middleware"
const router = Router()


router.post("/create",
    body("code")
        .notEmpty().withMessage("El codigo está vacío"),
    handleInputErrors,
    createPatient)


router.patch("/edit",editPatient)

router.get("/get-all",getAllPatients)





export default router