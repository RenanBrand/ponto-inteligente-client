import { FuncionarioService } from './../../../shared/services/funcionario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatPaginator,
  PageEvent } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule } from '@angular/material/table';

import {
  Sort,
  MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import {
  HttpUtilService,
  LancamentoService,
  Tipo,
  Lancamento,
  Funcionario  } from './../../../shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;


  constructor(
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }
  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }
  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }
  get funcId(): string {
    return sessionStorage['funcionarioId'] || false;
  }
  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id != usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg: string = "Erro obtendo funcionários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  exibirLancamentos() {
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected['value'];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage['funcionarioId'] = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
        this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  removerLancamentos(lancamentoId: string) {
    this.lancamentoService.removerLancamento(lancamentoId)
    .subscribe(
      data => {
        const msg: string = ' Lançamento removido com sucesso ';
        this.snackBar.open(msg, 'SUCCESS', {duration: 5000});
      },
      err => {
        let msg: string = ' Erro ao remover o lançamento, tente novamente ';
        if(err.status == 400){
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'ERROR', {duration: 5000});
      }
    );
  }
  removerDialog(lancamentoId: string){
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed()
    .subscribe (
      remover => {
        if (remover){
          this.removerLancamentos(lancamentoId);
        }
      }
    );
  }


  paginar(pageEvent: PageEvent){
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }
  ordenar(sort: Sort){
    if (sort.direction == ''){
      this.ordemPadrao();
    }else{
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }
}
@Component ({
  selector: 'confirmar-dialog',
  template: `
  <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="false" tabindex="-1">
      Não
    </button>
    <button mat-button [mat-dialog-close]="true" tabindex="2">
      Sim
    </button>
  </div>
`,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
