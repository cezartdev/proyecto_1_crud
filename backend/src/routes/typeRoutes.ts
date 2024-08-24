import {Router} from "express"
import {body} from "express-validator"
import {editTypePermissions, getAllTypes, getTypePermissions} from "../handlers/type"
import { handleInputErrors } from "../middleware"



const router = Router()


router.get("/get-all",getAllTypes)
router.get("/get-permissions/:name",getTypePermissions)
router.patch("/edit-permissions",editTypePermissions)


export default router