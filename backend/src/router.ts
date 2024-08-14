import {Router} from "express"
import userRoutes from "./routes/userRoutes"
import patientRoutes from "./routes/patientRoutes"

const router = Router()
//Routing
router.use("/user", userRoutes )
router.use("/patient", patientRoutes)

export default router