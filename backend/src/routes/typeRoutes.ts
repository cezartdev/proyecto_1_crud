import {Router} from "express"
import {body} from "express-validator"
import {deleteType, editTypePermissions, getAllTypes, getTypePermissions} from "../handlers/type"
import { handleInputErrors } from "../middleware"



const router = Router()


router.get("/get-all",getAllTypes)
router.get("/get-permissions/:name",getTypePermissions)
router.patch("/edit-permissions",
    body("permissions")
        .custom((value : Array<any>)=>value.length>0).withMessage("Debes seleccionar al menos una opcion"),
    handleInputErrors,
    editTypePermissions)
router.delete("/delete/:name",deleteType)


export default router