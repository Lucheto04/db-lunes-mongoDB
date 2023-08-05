import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routes/clientes.js';
dotenv.config();
let app = express();


app.use(express.json());
app.use('/clientes', appCliente);


const config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})