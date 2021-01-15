import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    this.usuario = new Usuario(); //Esto es lo mismo que inicializarlo arriba, pero mas correcto...
   }

  titulo: string = "Inicio de sesión";

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${ this.authService.usuario.username }, Ya estás autenticado!`, 'info');
      this.router.navigate(['/clientes']); 
    }
  }

  login(): void {
    if(this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Login error', 'Username or password incorrect!', 'error');
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario  = this.authService.usuario;
      this.router.navigate(['/clientes'])
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if(err.status == 400) {
        Swal.fire('Error login', `Usuario o clave incorrectos!`, 'error');
      }
    }
    );

  }

}
