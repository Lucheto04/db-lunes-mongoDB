import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Cliente {

    @Expose({ name: 'ID_Cliente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro cliente es obligatorio` } } })
    cliente: number;

    @Expose({ name: 'Nombre_Cliente' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Nombre_Cliente es obligatorio` } } })
    nombre: string;

    @Expose({ name: 'Apellido_cliente' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Apellido_cliente es obligatorio` } } })
    apellido: string;

    @Expose({ name: 'DNI' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro DNI es obligatorio y debe ser un string` } } })
    documento: string;

    @Expose({ name: 'Direccion_Cliente' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Direccion_Cliente es obligatorio` } } })
    direccion: string;

    @Expose({ name: 'Telefono_Cliente' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Telefono_Cliente es obligatorio` } } })
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