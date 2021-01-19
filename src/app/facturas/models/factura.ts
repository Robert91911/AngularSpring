import { Cliente } from "src/app/interfaces/Cliente";
import { ItemFactura } from "./itemFactura";

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    items: Array<ItemFactura> = [];
    cliente: Cliente;
    total: number;
    createAt: string;
  
    calcularGranTotal(): number {
      this.total = 0;
      this.items.forEach((item: ItemFactura) => {
        this.total += item.calcularImporte();
      });
      return this.total;
    }
  }