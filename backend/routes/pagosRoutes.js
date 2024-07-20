import express from "express";
import {
    createWebPayPlus,
    commitWebPayPlus,
    createWebPayOneClick,
    finishWebPayOneClick,
    authorizeWebPayOneClick,
    deleteWebPayOneClick,
    statusWebPayOneClick,
    refundWebPayOneClick,
} from "../controllers/pagoController.js";

const pagosRouter = express.Router();

pagosRouter.get("/createWebPayPlus", createWebPayPlus);
pagosRouter.get("/commitWebPayPlus", commitWebPayPlus);
// pagosRouter.post("/commit", commit);
// pagosRouter.post("/status", status);
// pagosRouter.post("/refund", refund);

pagosRouter.get("/createWebPayOneClick", createWebPayOneClick);
pagosRouter.get("/finishWebPayOneClick", finishWebPayOneClick);
pagosRouter.post("/authorizeWebPayOneClick", authorizeWebPayOneClick);
pagosRouter.post("/deleteWebPayOneClick", deleteWebPayOneClick);
pagosRouter.post("/statusWebPayOneClick", statusWebPayOneClick);
pagosRouter.post("/refundWebPayOneClick", refundWebPayOneClick);
export default pagosRouter;
