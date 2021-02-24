import { Router } from '@angular/router';
import { CadastroPjService } from './../../services';
import { CadastroPj } from './../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {
  CpfValidator,
  CnpjValidator
} from '../../../../shared/validators';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {
 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private cadastroPjService: CadastroPjService,
    private router: Router
    ) { }

  ngOnInit(): void {
  this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      nome: [ '', [Validators.required, Validators.minLength(3)]],
      razaoSocial: [ '', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [ Validators.required, CnpjValidator]],
      cpf: ['', [Validators.required, CpfValidator]],
      email: ['', [ Validators.required, Validators.email]],
      senha: ['', [ Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrarPj(){
    if (this.form.invalid){
      return;
    }
    const cadastroPj: CadastroPj = this.form.value;
    this.cadastroPjService.cadastrarPj(cadastroPj)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        const msg: string = 'Realize o Login para acessar o sistema';
        this.snackbar.open(msg, 'SUCESS', {duration: 5000});
        this.router.navigate(['/login']);
      },
      err => {
        console.log(JSON.stringify(err));
        let msg: string = 'Tente novamente em instantes';
        if (err.status == 400){
          msg = err.error.errors.join('  ');
        }
        this.snackbar.open(msg, 'ERROR', {duration: 5000});
      });
  }
}
