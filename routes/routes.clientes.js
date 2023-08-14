import { coneccion } from "../db/atlas.js";
import { queryCliente } from "../limit/config.js";
import { appMiddlewareClienteVerify, appDTOCliente } from "../middleware/middle.cliente.js";
import { Router } from "express";
let appCliente = Router();

let db = await coneccion();
let cliente = db.collection("cliente");

/* 2. Mostrar todos los clientes registrados en la base de datos.*/
appCliente.get('/', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;

    let result = await cliente.find().toArray();
    res.send(result)
});





export default appCliente;