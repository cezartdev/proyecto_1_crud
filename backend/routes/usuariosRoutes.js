import express from "express";

const router = express.Router();

import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkout.js";

//Autenticacion, Creacion, Registro y Confirmacion de Usuarios

router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar); //Los : sirven para crear routing dinamico en express
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);
export default router;
