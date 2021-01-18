import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Region } from '../interfaces/Region';
import { AuthService } from '../usuarios/auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  //Esto ahora se hace con el interceptor... token.interceptor.ts
  /*
  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }
  */

  //Esto ahora se hace con el interceptor... auth.interceptor.ts
  /*
  private isNoAutorizado(e): boolean {
    if(e.status == 401) {

      if(this.authService.isAuthenticated()) {
        this.authService.logout
      }

      this.router.navigate(['/login']);
      return true;

    }
    if(e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }
  */

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page : number): Observable<any> {
    //return of(CLIENTES) //Solo para probar antes de tener el backend
    //return this.http.get<Cliente[]>(this.urlEndPoint) //También funciona, es la forma normal y rapida (es lo mismo que lo de abajo comentado)


    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any ) => {
        let clientes = response as Cliente[];
        console.log("ClienteService: tap 1");
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre)
        }

        )
      }),
      map( ( response: any ) => {
        (response.content as Cliente[]).map(cliente => {

          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es')
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy'); //Se usa para listas pero tambien funciona
          //cliente.createdAt = formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US') //La forma normal y nativa de anglar
          return cliente;

        });
        return response;
      }),
      tap( ( response ) => {
        console.log("ClienteService: tap 2");
        ( response.content as Cliente[] ).forEach( cliente => {
          console.log(cliente.nombre)
        }
 
        )
      }),
    );

  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente ).pipe(
      catchError(e => {

        if(e.status == 400) {
          return throwError(e);
        }

        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      
      catchError(e => {

        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes'])
          console.error(e.error.mensaje);
        }
      
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        
        if(e.status == 400) {
          return throwError(e);
        }

        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }
      )
    )
  }

  upload(archivo: File, id) : Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers : httpHeaders
    });

    return this.http.request(req);

  }

}
