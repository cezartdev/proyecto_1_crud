import {Router} from "express"
import userRoutes from "./routes/userRoutes"
import permissionRoutes from "./routes/permissionRoutes"

const router = Router()
//Routing
router.use("/user", userRoutes )
router.use("/permission", permissionRoutes)

export default router