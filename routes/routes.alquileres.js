import { coneccion } from "../db/atlas.js";
import { queryAlquiler } from "../limit/config.js";
import { appMiddlewareAlquilerVerify, appDTOAlquiler } from "../middleware/middle.alquileres.js";
import { Router } from "express";
let appAlquiler = Router();

let db = await coneccion();
let alquiler = db.collection("alquiler");

appAlquiler.get('/', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;

    // let {id} = req.body
    // { "_id": new ObjectId(id)} !PARA BUSCQUEDA ESPECIFICA POR '_id'.

    let result = await alquiler.find().toArray();
    res.send(result)
});

appAlquiler.post('/', queryAlquiler(), appMiddlewareAlquilerVerify, appDTOAlquiler, async(req, res) => {
    let result;
    try {
        let result = await alquiler.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error)
        // result = error.errInfo.details.schemaRulesNotSatisfied[0].additionalProperties;
        // res.status(406).send(JSON.stringify({invalidProperties: result, message: "Estos campos no son validos, eliminelos"}))

        result = JSON.parse(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description);
        res.status(402).send(result);
    }
})


export default appAlquiler;