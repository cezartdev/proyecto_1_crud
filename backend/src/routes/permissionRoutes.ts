import {Router} from "express"
import {body} from "express-validator"
import {getPermissions} from "../handlers/permission"
import { handleInputErrors } from "../middleware"


const router = Router()

router.get("/get-all", getPermissions)

export default router