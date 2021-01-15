import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = "Curso Angular/Spring";

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  
  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
