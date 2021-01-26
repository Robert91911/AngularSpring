import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {flatMap, map, startWith} from 'rxjs/operators'
import { ClienteService } from 'src/app/clientes/cliente.service';
import Swal from 'sweetalert2';
import { Factura } from '../models/factura';
import { ItemFactura } from '../models/itemFactura';
import { Producto } from '../models/producto';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva factura";
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteSrv: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facutraSrv: FacturaService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );

    this.activatedRoute.paramMap.subscribe( params => {
      let clienteId = +params.get('clienteId');
      this.clienteSrv.getCliente(clienteId).subscribe( cliente => this.factura.cliente = cliente);
    })

  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facutraSrv.filtrarProducto(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto? producto.nombre : undefined
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    if(this.existeItem(producto.id)) {

      this.incrementaCantidad(producto.id);

    } else {

      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);

    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if(cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    })
  }

  existeItem(id: number): boolean {
    let existe = false;

    this.factura.items.forEach((item: ItemFactura) => {
      if(id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm): void {
    console.log(this.factura);
    if (this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facutraSrv.create(this.factura).subscribe(factura => {
        Swal.fire(this.titulo, `Factura ${factura.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      });
    }
  }

}
