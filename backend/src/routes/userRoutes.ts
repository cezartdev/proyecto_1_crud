import {Router} from "express"
import {body} from "express-validator"
import {createUser, getUser,updateUser,deleteUser,getAllUsers, loginValidate} from "../handlers/user"
import { handleInputErrors, handlePasswordEncrypt } from "../middleware"

const router = Router()

//Routing
router.post("/create",
    body("email")
        .notEmpty().withMessage("El correo está vacío")
        .isEmail().withMessage("El correo no está en el formato"),
    body("password")
        .notEmpty().withMessage("La contraseña está vacía"),
    body("type")
        .notEmpty().withMessage("El tipo de usuario está vacío"),
    handleInputErrors,
    handlePasswordEncrypt,
    createUser )


router.delete("/delete", deleteUser)
router.get("/get", getUser)
router.get("/get-all", getAllUsers)

router.post("/login", 
    body("email")
        .notEmpty().withMessage("El correo esta vacío")
        .isEmail().withMessage("El correo no está en el formato"),
    body("password")
        .notEmpty().withMessage("El correo esta vacío"),
    handleInputErrors,
    loginValidate)

export default router