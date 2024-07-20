import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import cors from "cors";
import pagosRoutes from "./routes/pagosRoutes.js";
import asyncHandler from "./helpers/asyncHandler.js";
const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

//Configurar CORS
//urls permitidas para hacer peticiones
//Es decir, que frontend puede hacer uso de este backend
const whitelist = [process.env.FRONTEND_URL, process.env.BACKEND_URL];

console.log("Frontend url: " + process.env.FRONTEND_URL);
console.log("Backend url: " + process.env.BACKEND_URL);

//Revisar esto

// app.use((req, res, next) => {
//     const corsOptions = {
//         origin: function (origin, callback) {
//             // Obtener la dirección IP del cliente desde las cabeceras 'x-forwarded-for' o 'x-real-ip'
//             const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

//             // Verificar si la solicitud proviene de localhost o de una dirección IP específica
//             if (origin === 'null' || origin === undefined || origin.includes('localhost') || whitelist.includes(clientIP)) {
//                 // Permitir la solicitud
//                 callback(null, true);
//             } else {
//                 // No permitir la solicitud
//                 callback(new Error("Error de Cors: Dominio no permitido"));
//             }
//         },
//     };

//     cors(corsOptions)(req, res, next);
// });

const corsOptions = {
    origin: function (origin, callback) {
        // Si origin es null, podría ser una solicitud local (no CORS)
        // se agrego la linea !origin
        // Verificar Origin por que está dejando enviar peticiones de lugares que no deberia

        console.log("Origen de la peticion: " + origin);

        if (!origin || whitelist.includes(origin)) {
            // Permitir la solicitud
            callback(null, true);
        } else {
            // No permitir la solicitud
            callback(new Error("Error de Cors: Dominio no permitido"));
        }
    },
};

app.use(cors(corsOptions));

//Cambiar a solamente api
app.post(
    "/api/email",
    asyncHandler(async (request, response, next) => {
        let params = request.method === "GET" ? request.query : request.body;
        console.log(params);

        return response.status(200).json({
            status: 200,
            msg: "mensaje enviado",
        });
    })
);
app.use("/api/usuarios", usuariosRoutes);
app.use("/pago", pagosRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
