import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/Cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo: string = "Crear cliente"

  constructor(
    private ClienteSrv: ClienteService, 
    private router: Router) { }

  ngOnInit() {
  }

  public create(): void {
    this.ClienteSrv.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }

}
