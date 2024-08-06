import {Router} from "express"
import userRoutes from "./routes/userRoutes"

const router = Router()
//Routing
router.use("/user", userRoutes )

export default router