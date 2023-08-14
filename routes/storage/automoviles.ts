import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Auto {

    @Expose({ name: 'ID_Automovil' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Automovil es obligatorio y debe ser un numero entero (int).`}}})
    automovil: number;

    @Expose({ name: 'Marca_Auto' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Marca_Auto es obligatorio y debe ser un string` }}})
    marca: string;

    @Expose({ name: 'Modelo_Auto' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Modelo_Auto es obligatorio y debe ser un string.`}}})
    modelo: string;

    @Expose({ name: 'Anio_Auto' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Anio_Auto es obligatorio y debe ser un numero entero (int).`}}})
    anio: number;

    @Expose({ name: 'Tipo_Auto' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Tipo_Auto es obligatorio y debe ser un string.`}}})
    tipo: string;

    @Expose({ name: 'Capacidad_Auto' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Capacidad_Auto es obligatorio y debe ser un numero entero (int).`}}})
    capacidad: number;

    @Expose({ name: 'Precio_Por_Dia' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Precio_Por_Dia es obligatorio y debe ser un numero entero (int).`}}})
    precio_diaro: number;

    constructor(data: Partial<Auto>) {
        this.automovil = 0,
        this.marca = "Faker",
        this.modelo = "Faker",
        this.anio = 0,
        this.tipo = "Faker",
        this.capacidad = 0,
        this.precio_diaro = 0
    }
}