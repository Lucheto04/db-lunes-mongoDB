import { coneccion } from "../db/atlas.js";
import { queryEmpleado } from "../limit/config.js";
import { appMiddlewareEmpleadoVerify, appDTOEmpleado } from "../middleware/middle.empleado.js";
import { Router } from 'express';
let appEmpleado = Router();

let db = await coneccion();
let empleado = db.collection("empleado");

appEmpleado.get('/', queryEmpleado(), appMiddlewareEmpleadoVerify, async(req, res) => {
    if(!req.rateLimit) return;

    // let {id} = req.body
    // { "_id": new ObjectId(id)} !PARA BUSCQUEDA ESPECIFICA POR '_id'.

    let result = await empleado.find().toArray();
    res.send(result)
});

appEmpleado.post('/', queryEmpleado(), appMiddlewareEmpleadoVerify, appDTOEmpleado, async(req, res) => {
    let result;
    console.log("Entramos a post");
    try {
        console.log("Entramos al try");
        let result = await empleado.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log("Entramos al catch");
        if (error)
        // result = error.errInfo.details.schemaRulesNotSatisfied[0].additionalProperties;
        // res.status(406).send(JSON.stringify({invalidProperties: result, message: "Estos campos no son validos, eliminelos"}))
        result = JSON.parse(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description);
        res.status(402).send(result);
    }
})

export default appEmpleado;