import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/Cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { Region } from 'src/app/interfaces/Region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  regiones: Region[];

  titulo: string = "Crear cliente";

  errores: string[];

  constructor(
    private clienteSrv: ClienteService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteSrv.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
    this.clienteSrv.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public create(): void {
    this.clienteSrv.create(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente guardado', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.status)
        console.error(err.error.errors)
      }
    );
  }

  public update(): void {
    this.cliente.facturas = null;

    this.clienteSrv.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.status)
      console.error(err.error.errors)
    })
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id === o2.id;
  }

}
