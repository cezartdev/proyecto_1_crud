import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"

async function connectDB() {

    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgBlue.white.bold("Conexion exitosa a la BD"))
        
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white.bold("Hubo un error al conectarse a la BD"))
        
    }
    
}

connectDB()

const server = express()

server.use("/api", router)


export default server