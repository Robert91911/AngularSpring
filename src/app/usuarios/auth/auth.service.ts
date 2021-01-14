import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
) { }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + 'Clave_00');

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type' : 'aplication/x-www-form-url-encoder', 
      'Autorization' : 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post(urlEndPoint, params, {headers: httpHeaders});
  }

}
