import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { TipoPipe } from './pipes/tipo.pipe';
@NgModule({
  declarations: [
    MascaraDirective,
    TipoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective,
    TipoPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
