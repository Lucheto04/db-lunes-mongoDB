import { coneccion } from "../db/atlas.js";
import { queryAuto } from "../limit/config.js";
import { appMiddlewareAutoVerify, appDTOAuto } from "../middleware/middle.autos.js";
import { Router } from "express";
let appAuto = Router();

let db = await coneccion();
let auto = db.collection("automovil");
let sucursal = db.collection("sucursal");
let auto_sucursal = db.collection("sucursal_automovil");

/* 3. Obtener todos los automóviles disponibles para alquiler */
appAuto.get('/', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await auto.find().toArray();
    res.send(result)
});

/* 8. Mostrar la cantidad total de automóviles disponibles en cada
sucursal. */
appAuto.get('/disponibles', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await auto_sucursal.aggregate([
        {    
            $lookup:{
                from: "sucursal",
                localField: "sucursal",
                foreignField: "sucursal_id",
                as: "fk_sucursal"
            }
        },
        {
            $unwind: "$fk_sucursal"
        },
        {
            $group: {
              _id: "$fk_sucursal.nombre",
              Cantidad_Disponible: {
                $sum: "$cantidad_autos"
              }
            }
        }
    ]).toArray();
    res.send(result)
});

/* 11. Mostrar todos los automóviles con una capacidad mayor a 5
personas. */
appAuto.get('/camionetas', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await auto.find(
        {
            capacidad: {$gt :5}
        }
    ).toArray();
    res.send(result)
});

/* 16. Listar todos los automóviles ordenados por marca y modelo. */
appAuto.get('/ordenados', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await auto.aggregate([
        {
            $group: {
                _id: "$marca",
                modelos: {
                    $push: "$$ROOT"
                }
            }
        },
        {
            $project: {
                "modelos._id": 0,
                "modelos.marca": 0
            }
        },
        { $sort: {_id: 1} }
    ]).toArray();
    res.send(result)
});

/* 17. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección. */
appAuto.get('/total/sucursales', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await sucursal.aggregate([
        {
            $lookup: {
                from: "sucursal_automovil",
                localField: "sucursal_id",
                foreignField: "sucursal",
                as: "automoviles"
            }
        },
        {
            $unwind: "$automoviles"
        },
        {
            $lookup: {
                from: "automovil",
                localField: "automoviles.automovil",
                foreignField: "automovil",
                as: "info_automovil"
            }
        },
        {
            $group: {
                _id: {
                    sucursal_id: "$sucursal_id",
                    nombre: "$nombre",
                    direccion: "$direccion"
                },
                cantidad_automoviles: { $sum: "$automoviles.cantidad_autos" }
            }
        },
        {
            $project: {
                _id: 0,
                sucursal_id: "$_id.sucursal_id",
                nombre_sucursal: "$_id.nombre",
                direccion: "$_id.direccion",
                cantidad_automoviles: 1
            }
        }
    ]).toArray();
    res.send(result)
});

/* 19. Mostrar los automóviles con capacidad igual a 5 personas y que
estén disponibles.*/
appAuto.get('/cantidad', queryAuto(), appMiddlewareAutoVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await auto.find(
        {
            capacidad: {$eq: 5}
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result)
});

export default appAuto;