import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from './../../shared/shared.module';
import { CadastrarPfComponent, CadastroPfComponent } from './components';



@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class CadastroPfModule { }
