import { coneccion } from "../db/atlas.js";
import { queryAuto } from "../limit/config.js";
import { appMiddlewareAutoVerify, appDTOAuto } from "../middleware/middle.autos.js";
import { Router } from "express";
let appAuto = Router();

let db = await coneccion();
let auto = db.collection("automovil");

/* 3. Obtener todos los automóviles disponibles para alquiler */
appAuto.get('/', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;

    let result = await auto.find().toArray();
    res.send(result)
});


export default appAuto;