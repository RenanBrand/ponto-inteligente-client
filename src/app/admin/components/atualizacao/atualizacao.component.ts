import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lancamento } from './../../../shared/models/lancamento.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from 'src/app/shared';
import * as moment from 'moment';
@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {
 form: FormGroup;
 tipos: string[];
 horas: string[];
 minutos: string[];
 lancamentoId: string;
 localizacao: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private lancamentoService: LancamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.gerarForm();
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
    this.horas = this.gerarListaNumero(0, 23);
    this.minutos = this.gerarListaNumero(0, 59);
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
    this.obterDadosLancamento();
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
    });
  }
gerarListaNumero(inicio: number, termino: number): string[]{
  const numeros: string[] = Array();
  for ( let i = inicio; i <= termino; i++){
    let numero: string = i.toString();
    if (i < 10){
      numero = '0' + numero;
    }
    numeros.push(numero);
  }
  return numeros;
}
obterDadosLancamento(){
  this.lancamentoService.buscarPorId(this.lancamentoId)
  .subscribe(
    dados => {
      const data = dados.data.data;
      this.form.get('data').setValue(data.substr(0, 10));
      this.form.get('horas').setValue(data.substr(11, 2));
      this.form.get('minutos').setValue(data.substr(14, 2));
      this.form.get('tipo').setValue(dados.data.tipo);
      this.localizacao = dados.data.localizacao;
    },
    err => {
      const msg: string = 'Erro obtendo lançamento';
      this.snackBar.open(msg, 'ERROR', {duration: 5000});
      this.router.navigate(['/admin']);
    });
}
atualizar() {
  if (this.form.invalid){
    return;
  }
  const dados = this.form.value;
  this.lancamentoService.atualizarLancamento(this.obterLancamento(dados))
  .subscribe(
    data => {
      const msg: string = 'Lancamento atualizado com sucesso';
      this.snackBar.open(msg, 'SUCCESS', {duration: 5000});
      this.router.navigate(['/admin']);
    },
    err => {
      let msg: string = 'Erro ao fazer o lançamento, tente novamente';
      if(err.status == 400) {
        msg = err.error.errors.join('  ');
      }
      this.snackBar.open(msg, 'ERROR', {duration: 5000});
    });
}

obterLancamento(dados: any): Lancamento{
  const data = moment(dados.data);
  data.set(
    {
      hour: dados.horas,
      minutes: dados.minutos,
      seconds: 0
    }
  );

  return new Lancamento(
    data.format('YYYY-MM-DD HH:mm:ss'),
    dados.tipo,
    this.localizacao,
    this.funcionarioId,
    this.lancamentoId
  );

}
get funcionarioId(): string{
  return sessionStorage['funcionarioId'];
}
}
