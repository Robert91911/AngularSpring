import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor() { 
    this.usuario = new Usuario(); //Esto es lo mismo que inicializarlo arriba, pero mas correcto...
   }

  titulo: string = "Inicio de sesión";

  ngOnInit() {
  }

  login(): void {
    if(this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Login error', 'Username or password incorrect!', 'error');
    }
  }

}
