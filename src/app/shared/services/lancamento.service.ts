import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { environment as env } from './../../../environments/environment';
import { Lancamento } from './../models';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
private readonly PATH: string = 'lancamentos';
private readonly PATH_ULT_LANC = '/funcionario/{funcionarioId}/ultimo';
private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId}';
private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH +
      this.PATH_ULT_LANC.replace(
       '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }
  cadastrar(lancamento: Lancamento): Observable<any> {
    return this.http.post(
      env.baseApiUrl + this.PATH,
      lancamento,
      this.httpUtil.headers()
    );
  }
  listarTodosLancamentos(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH +
      this.PATH_TODOS_LANC.replace(
      '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }
  listarTodosLancamentosPorFuncionarios(
    funcionarioId: string,
    pagina: number,
    ordem: string,
    direcao: string ): Observable<any> {
     const url: string = env.baseApiUrl +
     this.PATH + this.PATH_LANCAMENTOS
     .replace('{funcionarioId}', funcionarioId);
     const params: string = '?pag=' + pagina +
     '&ord=' + ordem + '&dir=' + direcao;
     return this.http.get(url + params, this.httpUtil.headers());
    }
}
