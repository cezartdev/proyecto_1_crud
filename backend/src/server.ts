import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import cors , {CorsOptions} from "cors"
async function connectDB() {

    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgBlue.white.bold("Conexion exitosa a la BD"))

    } catch (error) {
        // console.log(error)
        // console.log(colors.bgRed.white.bold("Hubo un error al conectarse a la BD"))
        
    }
    
}

connectDB()

const server = express()

const corsOptions : CorsOptions = {
    origin: function(origin,callback){
        console.log(colors.bgYellow.white.bold(origin))
        if(origin === process.env.FRONTEND_URL || origin === undefined){
            callback(null, true)
        }else{
            callback(new Error("Error de CORS"),false)
        }
    }
}

server.use(cors(corsOptions))

server.use(express.json())

server.use("/api", router)
export default server