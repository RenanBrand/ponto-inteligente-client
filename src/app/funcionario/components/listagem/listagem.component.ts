
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';

import {
  Lancamento,
  LancamentoService } from './../../../shared';
@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
    .subscribe(
      data => {
      const lancamentos = data['data'] as Lancamento[];
      this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    err => {
      const msg: string = 'Erro ao obter o lançamento';
      this.snackBar.open(msg, 'ERROR', { duration: 5000 });

    }
    );
  }

}
