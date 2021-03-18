import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ListagemComponent,
  LancamentoComponent,
  FuncionarioComponent } from './components';
import {
  SharedModule,
  HttpUtilService,
  LancamentoService,
  PtBrMatPaginatorIntl
} from './../shared';

@NgModule({
  declarations: [
    ListagemComponent,
    LancamentoComponent,
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    SharedModule
  ],
  providers: [
    HttpUtilService,
    LancamentoService,
    {
      provide: MatPaginatorIntl,
        useClass: PtBrMatPaginatorIntl
    }
  ]
})
export class FuncionarioModule { }
