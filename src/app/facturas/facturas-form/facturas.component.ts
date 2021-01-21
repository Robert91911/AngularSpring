import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { ClienteService } from 'src/app/clientes/cliente.service';
import { Factura } from '../models/factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva factura";
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  productos: string[] = ['One', 'Two', 'Three'];
  productosFiltrados: Observable<string[]>;

  constructor(
    private clienteSrv: ClienteService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.activatedRoute.paramMap.subscribe( params => {
      let clienteId = +params.get('clienteId');
      this.clienteSrv.getCliente(clienteId).subscribe( cliente => this.factura.cliente = cliente);
    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }
}
