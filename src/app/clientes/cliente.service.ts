import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
 
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES) //Solo para probar antes de tener el backend
    return this.http.get<Cliente[]>(this.urlEndPoint) //También funciona, es la forma normal y rapida (es lo mismo que lo de abajo comentado)

    /*
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Cliente[] )
    );
    */
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders} )
  }

  getCliente(id):Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} )
  }

}
