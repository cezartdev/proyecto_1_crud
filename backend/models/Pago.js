import mongoose from "mongoose";
import bcrypt from "bcrypt";

const pagoSchema = mongoose.Schema(
    {
        buyOrder: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        childBuyOrder: {
            type: String,
            required: true,
            trim: true,
        },
        paymentTypeCode: {
            type: String,
            required: true,
            trim: true,
        },
        installmentsNumber: {
            type: Number,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
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

const Pago = mongoose.model("Pago", pagoSchema);

export default Pago;
