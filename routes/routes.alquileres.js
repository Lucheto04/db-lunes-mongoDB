import { coneccion } from "../db/atlas.js";
import { queryAlquiler } from "../limit/config.js";
import { appMiddlewareAlquilerVerify, appDTOAlquiler } from "../middleware/middle.alquileres.js";
import { Router } from "express";
let appAlquiler = Router();

let db = await coneccion();
let alquiler = db.collection("alquiler");

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

/* 18. Obtener la cantidad total de alquileres registrados en la base de datos */
appAlquiler.get('/totales', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id) 
    let result = await alquiler.aggregate([
        {$count: 'alquiler'},
        {
            $project: {
                'Total de Alquileres' : '$alquiler'
            }
        }
    ]).toArray();
    res.send(result)
});

/* 12. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. */
appAlquiler.get('/inicio', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await alquiler.find(
        {
            inicio: {$eq: "2023-07-05"}
        }  
    ).toArray();
    res.send(result)
});

/* 6. Obtener los detalles del alquiler con el ID_Alquiler específico. */
appAlquiler.get('/:id', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id)
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
                alquiler: id
            }
        },
        {
            $project: {
              "_id": 0,
              "fk_alquiler_cliente._id": 0
            }
        }
    ]).toArray();
    res.send(result)
});



/* 9. Obtener el costo total de un alquiler específico. */
appAlquiler.get('/total/:id', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id) 
    let result = await alquiler.find(
        { 
            alquiler: id 
        }, 
        { 
            _id: 0, 
            cliente: 0, 
            inicio: 0,
            fin: 0, 
            estado: 0  
        }
    ).toArray();
    res.send(result)
});

/* 21. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'. */
appAlquiler.get('/fecha/filtrada', queryAlquiler(), appMiddlewareAlquilerVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id) 
    let result = await alquiler.find(
        {
            inicio: {
                $gte: "2023-07-05",
                $lte: "2023-07-10"
            }
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result)
});
export default appAlquiler;