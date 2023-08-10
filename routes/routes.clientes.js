import { coneccion } from "../db/atlas.js";
import { queryCliente } from "../limit/config.js";
import { appMiddlewareClienteVerify, appDTOCliente } from "../middleware/middle.cliente.js";
import { Router } from "express";
let appCliente = Router();

let db = await coneccion();
let cliente = db.collection("cliente");

appCliente.get('/', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;

    // let {id} = req.body
    // { "_id": new ObjectId(id)} !PARA BUSCQUEDA ESPECIFICA POR '_id'.

    let result = await cliente.find().toArray();
    res.send(result)
});

appCliente.post('/', queryCliente(), appMiddlewareClienteVerify, appDTOCliente, async(req, res) => {
    let result;
    try {
        let result = await cliente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error)
        // result = error.errInfo.details.schemaRulesNotSatisfied[0].additionalProperties;
        // res.status(406).send(JSON.stringify({invalidProperties: result, message: "Estos campos no son validos, eliminelos"}))

        result = JSON.parse(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description);
        res.status(402).send(result);
    }
})

export default appCliente;