import {Router} from "express"
import {body} from "express-validator"
import {create, getPermissions} from "../handlers/permission"
import { handleInputErrors } from "../middleware"


const router = Router()

router.get("/get-all", getPermissions)

router.post("/create",
    body("typeName")
    .notEmpty().withMessage("El nombre del tipo de usuario esta vacío")
    .isString().withMessage("El valor no es string"),
    body("customers")
        .isBoolean().withMessage("El valor debe ser verdadero o falso"),
    body("invoices")
        .isBoolean().withMessage("El valor debe ser verdadero o falso"),
    body("products")
        .isBoolean().withMessage("El valor debe ser verdadero o falso"),
    body("users")
        .isBoolean().withMessage("El valor debe ser verdadero o falso"),
    body() 
        .custom(({ customers, invoices, products, users }) => {
            if (!customers && !invoices && !products && !users) {
                throw new Error("Debes marcar al menos una opción");
            }
            return true;
        }),    
    handleInputErrors,
    create )

export default router