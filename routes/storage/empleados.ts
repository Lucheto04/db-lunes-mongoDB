import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Empleado {
    @Expose({ name: 'ID_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ID_Empleado es obligatorio y debe ser un numero entero (int).`}}})
    empleado: number;

    @Expose({ name: 'Nombre_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Nombre_Empleado es obligatorio y debe ser un string` } } })
    nombre: string;

    @Expose({ name: 'Apellido_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Apellido_Empleado es obligatorio y debe ser un string` } } })
    apellido: string;

    @Expose({ name: 'DNI' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro DNI es obligatorio y debe ser un string` } } })
    documento: string;

    @Expose({ name: 'Direccion_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Direccion_Empleado es obligatorio y debe ser un string` } } })
    direccion: string;

    @Expose({ name: 'Telefono_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Telefono_Empleado es obligatorio y debe ser un string` } } })
    numero: string;

    @Expose({ name: 'Cargo_Empleado' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Cargo_Empleado es obligatorio y debe ser un string` } } })
    cargo: string;

    constructor(data: Partial<Empleado>) {
        Object.assign(this, data);
        this.empleado = 0;
        this.nombre = "Faker";
        this.apellido = "Faker";
        this.documento = "Faker";
        this.direccion = "Faker";
        this.numero = "Faker";
        this.cargo = "Asistente";
    }

}