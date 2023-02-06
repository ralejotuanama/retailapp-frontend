import { GenericService } from './generic.service';
import { Cliente } from '../_model/cliente';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();
  
  

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/clientes`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  /*listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(cliente: Cliente) {
    return this.http.post(this.url, cliente);
  }

  modificar(cliente: Cliente) {
    return this.http.put(this.url, cliente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }*/

}
