import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + "/../models/**/*"],
    logging:false,
    dialectOptions: {
        ssl: {
            require: true, // Esto asegura que Sequelize usará SSL para la conexión
            rejectUnauthorized: false // Esto evita problemas con certificados autofirmados
        }
    }
})



export default db