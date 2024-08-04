import {Router} from "express"
import {createUser} from "./handlers/user"

const router = Router()

//Routing
router.get("/", (req,res)=>{
    res.json("desde GET")
})

router.post("/", createUser)


router.put("/", (req,res)=>{
    res.json("desde PUT")
})
router.patch("/", (req,res)=>{
    res.json("desde PATCH")
})
router.delete("/", (req,res)=>{
    res.json("desde DELETE")
})

export default router