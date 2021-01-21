import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Factura } from 'src/app/facturas/models/factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import { Cliente } from 'src/app/interfaces/Cliente';
import { AuthService } from 'src/app/usuarios/auth/auth.service';
import Swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: String = "Detalle cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private clienteSrv: ClienteService,
    public modalSrv: ModalService,
    public authSrv: AuthService,
    public facturaSrv: FacturaService,
  ) { }

  ngOnInit() {

  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if(this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen:', 'El archivo tiene que se una imágen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if(!this.fotoSeleccionada){
      Swal.fire('Error Upload:', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteSrv.upload(this.fotoSeleccionada, this.cliente.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round( ( event.loaded / event.total ) * 100);
        } else if(event.type === HttpEventType.Response) {
          let response : any = event.body;
          this.cliente = response.cliente as Cliente;

          this.modalSrv.notificarUpload.emit(this.cliente);
          Swal.fire('La foto se ha subido con éxito!', response.mensaje, 'success');
        }
        
      });
    }

  }

  cerrarModal() {
    this.modalSrv.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  delete(factura: Factura): void  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Estas seguro de que deseas eliminar la factura ${factura.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminala!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaSrv.deleteFacturas(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
            swalWithBootstrapButtons.fire(
              'Factura eliminada!',
              `Factura ${factura.descripcion} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
