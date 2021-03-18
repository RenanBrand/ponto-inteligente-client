import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './components/listagem/listagem.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';



@NgModule({
  declarations: [ListagemComponent, CadastroComponent, AtualizacaoComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
