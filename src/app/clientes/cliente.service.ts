import { Injectable, LOCALE_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES) //Solo para probar antes de tener el backend
    //return this.http.get<Cliente[]>(this.urlEndPoint) //También funciona, es la forma normal y rapida (es lo mismo que lo de abajo comentado)


    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        console.log("ClienteService: tap 1")
        clientes.forEach( cliente => {
          console.log(cliente.nombre)
        }

        )
      }),
      map((response) => {

        let clientes = response as Cliente[];
        
        return clientes.map(cliente => {

          cliente.nombre = cliente.nombre.toUpperCase();
          
          
          //let datePipe = new DatePipe('es')
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy'); //Se usa para listas pero tambien funciona
          //cliente.createdAt = formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US') //La forma normal y nativa de anglar

          return cliente;

        });
      }),
      tap(response => {
        console.log("ClienteService: tap 2")
        response.forEach( cliente => {
          console.log(cliente.nombre)
        }

        )
      }),
    );

  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if(e.status == 400) {
          return throwError(e);
        }

        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        
        if(e.status == 400) {
          return throwError(e);
        }

        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }
      )
    )
  }

}
