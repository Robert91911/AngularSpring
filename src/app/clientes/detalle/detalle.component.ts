import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/Cliente';
import Swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo: String = "Detalle cliente";
  fotoSeleccionada: File;

  constructor(
    private clienteSrv: ClienteService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id')
      if (id) {
        this.clienteSrv.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    }
    );
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
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
      .subscribe(cliente => {
        this.cliente = cliente;
        Swal.fire('La foto se ha subido con éxito!', `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success');
      });
    }

  }

}
