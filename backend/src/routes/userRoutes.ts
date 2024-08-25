import {Router} from "express"
import {body} from "express-validator"
import {createUser, getUser,updateUser,deleteUser,getAllUsers, loginValidate} from "../handlers/user"
import { handleInputErrors, handlePasswordEncrypt, handleUserTypeValidate } from "../middleware"


const router = Router()


//Routing
router.post("/create",
    body("name")
        .notEmpty().withMessage("El nombre esta vacio"),
    body("email")
        .notEmpty().withMessage("El correo está vacío")
        .isEmail().withMessage("El correo no está en el formato"),
    body("password")
        .notEmpty().withMessage("La contraseña está vacía"),
    body("type")
        .notEmpty().withMessage("El tipo de usuario está vacío"),
    handleInputErrors,
    handlePasswordEncrypt,
    handleUserTypeValidate,
    createUser )



router.delete("/delete/:email",deleteUser)
router.get("/get/:email", getUser)
router.get("/get-all", getAllUsers)

router.patch("/edit-user",
    body("email")
        .notEmpty().withMessage("El email no puede estar vacio"),
    handleInputErrors,
    updateUser);

router.post("/login", 
    body("email")
        .notEmpty().withMessage("El correo esta vacío")
        .isEmail().withMessage("El correo no está en el formato"),
    body("password")
        .notEmpty().withMessage("La contraseña esta vacía"),
    handleInputErrors,
    loginValidate)

export default router