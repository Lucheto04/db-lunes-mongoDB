import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import {validate} from 'class-validator';
import { Cliente } from '../routes/storage/clientes.js';
import { Router } from "express";
const appMiddlewareClienteVerify = Router()
const appDTOCliente = Router();

appMiddlewareClienteVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const {iat, exp, ...newPayload } = payload
    payload = newPayload
    let clone = JSON.stringify(classToPlain(plainToClass(Cliente, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    (!verify) ? res.status(406).send({status: 406, message: "No Autorizado"}) : next();
});

appDTOCliente.use( async(req,res,next) =>  {
    try {
        let data = plainToClass(Cliente, req.body);
        await validate(data)
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next()
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareClienteVerify,
    appDTOCliente
};