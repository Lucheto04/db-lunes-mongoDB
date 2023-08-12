import { coneccion } from "../db/atlas.js";
import { queryAuto } from "../limit/config.js";
import { appMiddlewareAutoVerify, appDTOAuto } from "../middleware/middle.autos.js";
import { Router } from "express";
let appAuto = Router();

let db = await coneccion();
let auto = db.collection("automovil");

appAuto.get('/', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;

    // let {id} = req.body
    // { "_id": new ObjectId(id)} !PARA BUSCQUEDA ESPECIFICA POR '_id'.

    let result = await auto.find().toArray();
    res.send(result)
});




export default appAuto;