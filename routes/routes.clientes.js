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


export default appCliente;