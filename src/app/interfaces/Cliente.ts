import { Factura } from "../facturas/models/factura";
import { Region } from "./Region";

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    createdAt: string;
    email: string;
    foto: string;
    region: Region;
    facturas: Array<Factura> = []; //Igual que... Factura[]
}