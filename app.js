import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routes/routes.clientes.js';
import appEmpleado from './routes/routes.empleados.js';
import appAuto from './routes/routes.autos.js';
import appAlquiler from './routes/routes.alquileres.js';
import { appToken, appVerify } from './limit/token.js';
dotenv.config();
let app = express();

app.use(express.json());

app.use('/empleados', appVerify, appEmpleado);
app.use('/clientes', appVerify, appCliente);
app.use('/alquileres', appVerify, appAlquiler);
app.use('/autos', appVerify, appAuto);
app.use('/token', appToken)


let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
});