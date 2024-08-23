import {Router} from "express"
import {body} from "express-validator"
import {getAllTypes} from "../handlers/type"
import { handleInputErrors } from "../middleware"


const router = Router()


router.get("/get-all",getAllTypes)


export default router