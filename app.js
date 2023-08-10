import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routes/routes.clientes.js';
import { appToken, appVerify } from './limit/token.js';
dotenv.config();
let app = express();

app.use(express.json());
app.use('/clientes', appVerify, appCliente);
app.use('/token', appToken)


let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
});