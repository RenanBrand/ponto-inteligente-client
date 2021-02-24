import { environment as env } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { CadastroPf } from './../models/cadastro-pf.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CadastroPfService {
private readonly PATH: string = 'cadastrar-pf';
  constructor(private http: HttpClient) { }

cadastrarPf(cadastroPf: CadastroPf): Observable<any> {

  return this.http.post(env.baseUrl + this.PATH, cadastroPf);
}
}
