import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(
    public clienteSrv: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalSrv: ModalService,
    public authSrv: AuthService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page'); // El +params convierte el string en un number

      if (!page) {
        page = 0;
      }

      this.clienteSrv.getClientes(page)
        .pipe(
          tap(response => {
            console.log("ClienteComponent : tap 3");
            (response.content as Cliente[]).forEach(cliente => { console.log(cliente.nombre) });
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[]
          this.paginador = response;
        });

        this.modalSrv.notificarUpload.subscribe(cliente => {
          this.clientes = this.clientes.map(clienteOriginal => {
            if(cliente.id == clienteOriginal.id) {
              clienteOriginal.foto = cliente.foto;
            }
            return clienteOriginal;
          })
        })

    });
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Estas seguro de que deseas eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteSrv.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalSrv.abrirModal();
  }

}
