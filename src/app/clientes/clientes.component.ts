import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteSrv: ClienteService) { }

  ngOnInit() {
    this.clienteSrv.getClientes().subscribe(
      clientes => this.clientes = clientes
    )
  }

}
