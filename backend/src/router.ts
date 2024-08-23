import {Router} from "express"
import userRoutes from "./routes/userRoutes"
import permissionRoutes from "./routes/permissionRoutes"
import typeRoutes from "./routes/typeRoutes"

const router = Router()
//Routing
router.use("/user", userRoutes )
router.use("/permission", permissionRoutes)
router.use("/type",typeRoutes)

export default router