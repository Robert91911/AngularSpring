import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/Cliente';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor() { }

  ngOnInit() {
    this.clientes = CLIENTES;
  }

}
