import { ObjectId } from "mongodb";
import { coneccion } from "../db/atlas.js";
import { Router } from "express";
import { queryCliente } from "../limit/config.js";
let appCliente = Router();

appCliente.get('/', queryCliente(), async(req, res) => {
    if (!req.rateLimit) return;
    let {id} = req.body 
    let db = await coneccion();
    let cliente = db.collection("cliente");
    //
    let result = await cliente.find({"_id": id}).toArray();
    res.send(result);
});


export default appCliente;