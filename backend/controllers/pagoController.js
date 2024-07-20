import Inscripcion from "../models/Inscripcion.js";
import asyncHandler from "../helpers/asyncHandler.js";
//Por alguna razon no encontraba WebpayPlus asi que lo deje así
import transbank from "transbank-sdk";
import Pago from "../models/Pago.js";
const { WebpayPlus } = transbank;

const createWebPayPlus = asyncHandler(async (request, response, next) => {
    let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    let amount = Math.floor(Math.random() * 1000) + 1001;
    // let returnUrl = request.protocol + "://" + request.get("host") + "/pago/commit";
    let returnUrl = `${process.env.FRONTEND_URL}/pago/commitWebPayPlus`;
    try {
        const createResponse = await new WebpayPlus.Transaction().create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );

        let token = createResponse.token;
        let url = createResponse.url;

        let viewData = {
            buyOrder,
            sessionId,
            amount,
            returnUrl,
            token,
            url,
        };

        // Continuar con el resto del código según sea necesario

        // Puedes enviar la respuesta JSON aquí si es necesario
        console.log(viewData);
        response.json(viewData);

        // response.redirect(await viewData.returnUrl); //Error de Cors
    } catch (error) {
        console.log(error);
        // Manejar errores aquí
        response.status(500).json({ error: "Internal Server Error" });
    }
});

const commitWebPayPlus = asyncHandler(async function (request, response, next) {
    //Flujos:
    //1. Flujo normal (OK): solo llega token_ws
    //2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
    //3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
    //4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
    // console.log(
    //     "================================================================================"
    // );
    // console.log(request);
    // console.log(
    //     "================================================================================"
    // );

    let params = request.method === "GET" ? request.query : request.body;

    let token = params.token_ws;

    let viewData = {
        token,
    };

    if (token) {
        //Flujo 1
        const commitResponse = await new WebpayPlus.Transaction().commit(token);
        viewData = {
            token,
            commitResponse,
        };
        console.log(viewData);
        response.json(viewData);
    } else {
        const error = new Error("Error");
        response.status(500).json({ msg: error.message });
    }

    //Mensaje de error
});

const { Oneclick, TransactionDetail, IntegrationCommerceCodes } = transbank;

const createWebPayOneClick = asyncHandler(async (request, response, next) => {
    // let randomNumber = Math.floor(Math.random() * 100000) + 1;
    // let name = "User-" + randomNumber;
    // let email = "user." + randomNumber + "@example.cl";
    // let responseUrl =
    //     request.protocol + "://" + request.get("host") + "/oneclick_mall/finish";
    const { name, email } = await request.query;

    const existeUsuario = await Inscripcion.findOne({ user_email: email }); //esto porque no se llaman igual el user_email y email

    if (existeUsuario) {
        const error = new Error("usuario ya registrado");

        console.log(error.message);
        return response.status(400).json({ msg: error.message });
    }

    let responseUrl = `${process.env.FRONTEND_URL}/pago/finishWebPayOneClick`;

    const startResponse = await new Oneclick.MallInscription().start(
        name,
        email,
        responseUrl
    );

    let viewData = {
        name,
        email,
        responseUrl,
        startResponse,
    };

    const usuario = new Inscripcion();
    usuario.user_name = name;
    usuario.user_email = email;
    usuario.token = startResponse.token;
    await usuario.save();

    console.log(viewData);
    response.json(viewData);
});

const finishWebPayOneClick = asyncHandler(async (request, response, next) => {
    let params = request.method === "GET" ? request.query : request.body;

    let token = params.TBK_TOKEN;

    //cuando el usuario cancela la inscripcion se llama a la ruta post de finish
    //Entonces al hacer click en el boton "cancelar inscripcion" se deberia
    //llamar a una ruta post y enviarle en el body el TOKEN, ORDEN DE COMPRA Y IDSESSION

    const finishResponse = await new Oneclick.MallInscription().finish(token);
    let viewData = {
        token,
        finishResponse,
    };

    const usuario = await Inscripcion.findOne({ token });

    usuario.tbk_user = finishResponse.tbk_user;
    usuario.card_type = finishResponse.card_type;
    usuario.token = "";
    await usuario.save();

    console.log(finishResponse);
    const { response_code } = finishResponse;
    response.json(response_code);
});

/*
@brief Aqui es donde se autorizan los pagos de las tarjetas que ya fueron inscritas
@return Retorna el codigo de respuesta. Revisar transbankdevelopers para conocer todos
los codigos de respuesta disponibles (codigo 0 es OK)
*/

const authorizeWebPayOneClick = asyncHandler(async (request, response, next) => {
    const username = request.body.user_name; //ajustar segun sea necesario
    const tbkUser = request.body.tbk_user;

    const usuario = await Inscripcion.findOne({ tbk_user: tbkUser });

    if (!usuario) {
        console.log("No existe el usuario registrado");
        return response.status(404).json({ msg: "No existe el usuario" });
    }

    const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    let amount = Math.floor(Math.random() * 1000) + 1001;
    let childCommerceCode = IntegrationCommerceCodes.ONECLICK_MALL_CHILD1; //codigo de comercio o commerce_code

    const details = [new TransactionDetail(amount, childCommerceCode, childBuyOrder)];

    const authorizeResponse = await new Oneclick.MallTransaction().authorize(
        username,
        tbkUser,
        buyOrder,
        details
    );

    let viewData = {
        username,
        tbkUser,
        buyOrder,
        childCommerceCode,
        amount,
        childBuyOrder,
        details,
        authorizeResponse,
    };
    //Guardar el pago en base de datos
    //al parecer la orden de compra es la variable buyOrder y no childBuyOrder
    const pago = new Pago();
    pago.buyOrder = buyOrder;
    pago.amount = amount;
    pago.status = authorizeResponse.details[0].status;
    pago.date = authorizeResponse.transaction_date;
    pago.childBuyOrder = childBuyOrder;
    pago.paymentTypeCode = authorizeResponse.details[0].payment_type_code;
    pago.installmentsNumber = authorizeResponse.details[0].installments_number;
    await pago.save();

    //Podriamos devolver solo el response_code
    const response_code = authorizeResponse.details[0].response_code;
    // const status = authorizeResponse.details[0].status;

    console.log(authorizeResponse);

    console.log(`BuyOrder: ${buyOrder}`); // Esta es la real orden de compra

    response.json(response_code);
});

const deleteWebPayOneClick = asyncHandler(async (request, response, next) => {
    const username = request.body.user_name;
    const tbkUser = request.body.tbk_user;

    console.log(username + " " + tbkUser);
    let dato;
    //Dato toma el valor de true cuando el usuario existe y fue eliminado por
    //webpay y false cuando no existe
    //Primero intentamos eliminar al usuario de WebPay
    //Luego se elimina de la base de datos
    //Por eso se separo en dos try catch
    try {
        dato = await new Oneclick.MallInscription().delete(tbkUser, username);
        console.log(dato + " El usuario fue eliminado");
    } catch (error) {
        dato = false;
        console.log(dato + " No existe el usuario");
        return response.status(404).json({ msg: "No existe el usuario" });
    }

    try {
        const usuario = await Inscripcion.findOne({ tbk_user: tbkUser });
        await usuario.deleteOne();
    } catch (error) {
        console.log(error);
        return response.status(404).json({ msg: "Ha ocurrido un error" });
    }

    // let viewData = {
    //     username,
    //     tbkUser,
    // };

    response.json({ msg: "El usuario fue eliminado" });
});

const statusWebPayOneClick = asyncHandler(async (request, response, next) => {
    const buyOrder = request.body.buy_order;

    try {
        const statusResponse = await new Oneclick.MallTransaction().status(buyOrder);
        let viewData = {
            buyOrder,
            statusResponse,
        };

        console.log(statusResponse);
        // response.json(statusResponse);
        response.json(statusResponse.details[0].response_code); //modificar segun sea conveniente
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: "ha ocurrido un error" });
    }
});

//TODO revisar esta funcion y pasar por parametro las variables
//ademas cambiar estructura (Schema) de mongodb de los pagos para
//guardar el childBuyOrder

const refundWebPayOneClick = asyncHandler(async (request, response, next) => {
    const buyOrder = request.body.buy_order;
    const childCommerceCode = "597055555542"; //codigo de comercio
    const childBuyOrder = request.body.child_buy_order;
    const amount = request.body.amount;
    try {
        const refundResponse = await new Oneclick.MallTransaction().refund(
            buyOrder,
            childCommerceCode,
            childBuyOrder,
            amount
        );

        let viewData = {
            refundResponse,
            buyOrder,
            amount,
        };

        const status = refundResponse.type;
        const pago = await Pago.findOne({ buyOrder });
        pago.status = status;
        pago.save();
        console.log(refundResponse);
    } catch (error) {
        console.log("\n---------Error Message---------");
        console.log(error.message);
        return response.status(422).json({ msg: error.message });
    }
});

export {
    createWebPayPlus,
    commitWebPayPlus,
    createWebPayOneClick,
    finishWebPayOneClick,
    authorizeWebPayOneClick,
    deleteWebPayOneClick,
    statusWebPayOneClick,
    refundWebPayOneClick,
};
