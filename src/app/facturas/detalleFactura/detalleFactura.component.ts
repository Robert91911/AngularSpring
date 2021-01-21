import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../models/factura';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-detalleFactura',
  templateUrl: './detalleFactura.component.html',
  styleUrls: ['./detalleFactura.component.scss']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura'

  constructor(
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let id = +params.get('id');
      this.facturaService.getFacturas(id).subscribe( factura => this.factura = factura )
    })
  }



}
