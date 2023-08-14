import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Alquiler {

    @Expose({ name: 'ID_Alquiler' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Alquiler es obligatorio y debe ser un numero entero (int).`}}})
    alquiler: number;

    @Expose({ name: 'ID_Cliente_id' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Cliente_id es obligatorio y debe ser un numero entero (int).`}}})
    cliente: number;

    @Expose({ name: 'ID_Automovil_id' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Automovil_id es obligatorio y debe ser un numero entero (int).`}}})
    automovil: number;

    @Expose({ name: 'Fecha_Inicio' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Fecha_Inicio es obligatorio y debe ser un string` }}})
    inicio: string;

    @Expose({ name: 'Fecha_Fin' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Fecha_Fin es obligatorio y debe ser un string` }}})
    fin: string;

    @Expose({ name: 'Costo_Total' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Costo_Total es obligatorio y debe ser un string` }}})
    costo: number;

    @Expose({ name: 'Estado_Alquiler' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Estado_Alquiler es obligatorio y debe ser un string` }}})
    estado: string;

    constructor (data: Partial<Alquiler>) {
        this.alquiler = 0;
        this.cliente = 0;
        this.automovil = 0;
        this.inicio = "YYYY-MM-DD";
        this.fin = "YYYY-MM-DD";
        this.costo = 0;
        this.estado = "Faker";
    }
}