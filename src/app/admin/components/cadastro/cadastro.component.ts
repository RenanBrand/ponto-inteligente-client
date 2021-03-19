import { Lancamento } from './../../../shared/models/lancamento.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
form: FormGroup;
tipos: string[];
horas: string[];
minutos: string[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
  }
  gerarForm(){
    this.form = this.fb.group(
      {
        data: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        horas: ['', [Validators.required]],
        minutos: ['', [Validators.required]]
      });
  }
cadastrar(){

  if (this.form.invalid){
    return;
  }
  const dados = this.form.value
  this.lancamentoService.cadastrar(this.obterLancamento(dados))
  .subscribe(
    data => {
      const msg: string = 'Lançamento cadastrado com sucesso';
      this.snackBar.open(msg, 'SUCCESS', {duration: 5000});
      this.router.navigate(['/admin']);
    },
    err => {
      let msg: string = 'Erro ao fazer o lançamento, tente novamente';
      if ( err.status == 400 ){
        msg = err.error.errors.join('  ');
      }
      this.snackBar.open(msg, 'ERROR', {duration: 5000});
    }
  );
}
obterLancamento(dados: any): Lancamento {
const data = moment(dados.data);
data.set({
  hour: dados.horas,
  minutes: dados.minutos,
  seconds: 0
});

return new Lancamento(
  data.format('YYYY-MM-DD HH:mm:ss'),
  dados.tipo,
  '',
  this.funcionarioId
);
}

get funcionarioId(): string {
  return sessionStorage['funcionarioId'];
}

gerarListaNumeros(inicio: number, termino: number): string[] {
  const numeros: string[] = Array();
  for (let i = inicio; i <= termino; i++) {
    let numero: string = i.toString();
    if (i < 10) {
      numero = "0" + numero;
    }
    numeros.push(numero);
  }
  return numeros;
}
}
