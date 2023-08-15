import { coneccion } from "../db/atlas.js";
import { queryCliente } from "../limit/config.js";
import { appMiddlewareClienteVerify, appDTOCliente } from "../middleware/middle.cliente.js";
import { Router } from "express";
let appCliente = Router();

let db = await coneccion();
let cliente = db.collection("cliente");
let reserva = db.collection("reserva");

/* 2. Mostrar todos los clientes registrados en la base de datos.*/
appCliente.get('/', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await cliente.find().toArray();
    res.send(result)
});

/* 15. Obtener los datos de los clientes que realizaron al menos un
alquiler */
appCliente.get('/reservaron', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await cliente.aggregate([
        {
            $lookup: {
                from: "alquiler",
                localField: "cliente",
                foreignField: "cliente",
                as: "alquileres"
            }
        },
        {
            $match: {
                "alquileres": { $gt: [] }  
            }
        },
        {
            $project: {
                _id: 0,
                cliente: 1,
                nombre: 1,
                apellido: 1,
                documento: 1,
                direccion: 1,
                numero: 1,
                Email: 1
            }
        }
    ]).toArray();
    res.send(result)
});

/* 5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado. */
appCliente.get('/pendientes', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await reserva.aggregate([
        {
            $match: {
              estado: "Pendiente"
            }
        },
        {    
            $lookup:{
                from: "cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "fk_cliente"
            }
        },
        {    
            $lookup:{
                from: "automovil",
                localField: "automovil",
                foreignField: "automovil",
                as: "fk_automovil"
            }
        },
        {
            $unwind: "$fk_automovil",
        },
        {
            $unwind: "$fk_cliente"
        },
        {
            $project: {
              "_id": 0,
              "fk_cliente._id": 0,
              "fk_automovil._id": 0
            }
        }
    ]).toArray();
    res.send(result)
});


/* 10. Listar los clientes con el DNI específico. */
appCliente.get('/:DNI', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let DNI = req.params.DNI
    let result = await cliente.find(
        {
            documento: DNI
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result)
});

/* 13. Listar las reservas pendientes realizadas por un cliente
específico. */
appCliente.get('/pendiente/:id', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id)
    let result = await reserva.find(
        {
            estado: "Pendiente",
            cliente: id
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result)
});


/* 20. Obtener los datos del cliente que realizó la reserva con ID_Reserva específico. */
appCliente.get('/reserva/:id', queryCliente(), appMiddlewareClienteVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let id = parseInt(req.params.id)
    let result = await reserva.aggregate([
        {
            $match: {
                reserva: id
            }
        },
        {
            $lookup: {
                from: "cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "datos_cliente"
            }
        },
        {
            $unwind: "$datos_cliente"
        },
        {
            $project: {
                _id: 0,
                reserva: 1,
                cliente: "$datos_cliente.cliente",
                nombre: "$datos_cliente.nombre",
                apellido: "$datos_cliente.apellido",
                documento: "$datos_cliente.documento",
                direccion: "$datos_cliente.direccion",
                numero: "$datos_cliente.numero",
                Email: "$datos_cliente.Email"
            }
        }
    ]).toArray();
    res.send(result)
});

export default appCliente;