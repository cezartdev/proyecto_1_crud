import mongoose from "mongoose";

//Tuve problemas con la conexion tuve que cambiar
//el @ de la contraseña por '%40'
//al parecer no lo detectaba bien

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI
            //Al parecer ya no es necesario estas opciones
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;
