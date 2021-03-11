import { HttpUtilService } from './../../../shared/services/http-util.service';
import { Lancamento } from './../../../shared/models/lancamento.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Tipo,
  LancamentoService } from './../../../shared';

import * as moment from 'moment';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  private dataAtualEn : string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService) { }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado='';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }
    return '';
  }
  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }
  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }
  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoTipoLancado()
    .subscribe(
      data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      err => {
        const msg: string = 'ERRO ao obter o ultimo lançamento';
        this.snackBar.open(msg, 'ERROR', {duration: 5000});
      });

  }
  cadastrar(tipo: Tipo){
   const lancamento: Lancamento = new Lancamento(
     this.dataAtualEn,
     tipo,
     this.geoLocation,
     this.httpUtil.obterIdUsuario()
   );
   this.lancamentoService.cadastrar(lancamento)
   .subscribe(
     data => {
      const msg: string = 'Lançamento cadastrado com sucesso';
      this.snackBar.open(msg, 'SUCESS', {duration: 5000});
      this.router.navigate(['/funcionario/listagem']);
   },
   err => {
     let msg: string = 'Erro ao fazer o lançamento, Tente novamente';
     if (err.status === 400){
       msg = 'Lançamento feito errado, faça corretamente';
     }
     this.snackBar.open(msg, 'ERROR', {duration: 5000});
   });

    //alert(`tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn},
   // geoLocation: ${this.geoLocation}`);

  }
  obterUrlMapa(): string {
  	return "https://www.google.com/maps/search/?api=1&query=" +
  		this.geoLocation;
  }
  exibirInicioTrabalho(): boolean {
  	return this.ultimoTipoLancado == '' ||
  		this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
  		this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }

}
