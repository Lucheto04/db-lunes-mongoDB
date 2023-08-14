import { coneccion } from "../db/atlas.js";
import { queryAlquiler } from "../limit/config.js";
import { appMiddlewareAlquilerVerify, appDTOAlquiler } from "../middleware/middle.alquileres.js";
import { Router } from "express";
let appAlquiler = Router();

let db = await coneccion();
let alquiler = db.collection("alquiler");

appAlquiler.get('/', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;

    let result = await alquiler.find().toArray();
    res.json(result)
});

/* 4. Listar todos los alquileres activos junto con los datos de los clientes relacionados. */
appAlquiler.get('/activos', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await alquiler.aggregate([
        {    
            $lookup:{
                from: "cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "fk_alquiler_cliente"
            }
        },
        {
            $match: {
                estado: "Activo"
            }
        },
        {
            $project: {
                "_id": 0,    
                "inicio": 0,
                "fin": 0,
                "fk_alquiler_cliente._id": 0
            }
        }
    ]).toArray();

    res.send(result)
});

export default appAlquiler;