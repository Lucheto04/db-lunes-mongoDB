import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Cliente {

    @Expose({ name: 'ID_Cliente' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Cliente es obligatorio y debe ser un numero entero (int).`}}})
    cliente: number;

    @Expose({ name: 'Nombre_Cliente' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Nombre_Cliente es obligatorio y debe ser un string` } } })
    nombre: string;

    @Expose({ name: 'Apellido_cliente' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Apellido_cliente es obligatorio y debe ser un string` } } })
    apellido: string;

    @Expose({ name: 'DNI' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro DNI es obligatorio y debe ser un string` } } })
    documento: string;

    @Expose({ name: 'Direccion_Cliente' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Direccion_Cliente es obligatorio y debe ser un string` } } })
    direccion: string;

    @Expose({ name: 'Telefono_Cliente' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Telefono_Cliente es obligatorio y debe ser un string` } } })
    numero: string;

    @Expose({ name: 'correo_cliente' })
    @Transform(({value}) => { if(value) return value; else "Faker@gmail.com" })
    Email: string;

    constructor(data: Partial<Cliente>) {
        Object.assign(this, data);
        this.cliente = 0;
        this.nombre = "Faker";
        this.apellido = "Faker";
        this.documento = "Faker000";
        this.direccion = "Faker#000";
        this.numero = "Faker000";
      }
}