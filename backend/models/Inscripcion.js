import mongoose from "mongoose";
import bcrypt from "bcrypt";

const InscripcionSchema = mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },
        user_email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            default: "",
        },
        tbk_user: {
            type: String,
            trim: true,
            unique: true,
            default: "",
        },
        card_type: {
            type: String,
            trim: true,
            default: "",
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//aclarar que es importante no usar arrow functions en esta parte
//.pre es un middleware de mongoose. Se ejecuta antes de guardar el documento en
//base de datos
// usuarioSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
//     return await bcrypt.compare(passwordFormulario, this.password);
// };

//Podria hacerse un hash del tbk_user

const Inscripcion = mongoose.model("Inscripcion", InscripcionSchema);

export default Inscripcion;
