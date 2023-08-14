import { coneccion } from "../db/atlas.js";
import { queryEmpleado } from "../limit/config.js";
import { appMiddlewareEmpleadoVerify, appDTOEmpleado } from "../middleware/middle.empleado.js";
import { Router } from 'express';
let appEmpleado = Router();

let db = await coneccion();
let empleado = db.collection("empleado");

/* 7. Listar los empleados con el cargo de "Vendedor". */
appEmpleado.get('/vendedores', queryEmpleado(), appMiddlewareEmpleadoVerify, async(req, res) => {
    if(!req.rateLimit) return;

    let result = await empleado.find({cargo: {$eq:"Vendedor"}}).toArray();
    res.send(result)
});

/* 14. Mostrar los empleados con cargo de "Gerente" o "Asistente". */
appEmpleado.get('/cargo', queryEmpleado(), appMiddlewareEmpleadoVerify, async(req, res) => {
    if(!req.rateLimit) return;

    let result = await empleado.find(
        {
            $or: [{cargo: "Gerente"}, {cargo: "Asistente"}]
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result)
});

export default appEmpleado;