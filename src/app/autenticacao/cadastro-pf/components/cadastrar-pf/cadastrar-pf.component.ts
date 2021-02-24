import { CadastroPfService } from './../../services/cadastro-pf.service';
import { Router } from '@angular/router';
import { CadastroPf } from './../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CnpjValidator, CpfValidator } from './../../../../shared/validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastroPfService: CadastroPfService) { }

  ngOnInit(): void {
    this.gerarForm();
  }
gerarForm(){
  this.form = this.fb.group({
    nome: [ '', [Validators.required, Validators.minLength(3)]],
    cnpj: ['', [ Validators.required, CnpjValidator]],
    cpf: ['', [Validators.required, CpfValidator]],
    email: ['', [ Validators.required, Validators.email]],
    senha: ['', [ Validators.required, Validators.minLength(6)]]
  });
}
cadastrarPf(){

  if (this.form.invalid){
   return;

  }
  const cadastrarPf: CadastroPf = this.form.value;
  this.cadastroPfService.cadastrarPf(cadastrarPf)
  .subscribe(
    data => {
      console.log(JSON.stringify(data));
      const msg: string = 'Realize o Login para acessar o sistema';
      this.snackBar.open(msg, 'SUCESS', {duration: 5000});
      this.router.navigate(['/login']);
    },
    err => {
      console.log(JSON.stringify(err));
      let msg: string = 'Erro ao cadastrar, tente novamente em instantes';
      if (err.status === 400){
        msg = err.error.errors.join('  ');
      }
      this.snackBar.open(msg, 'ERROR', { duration: 5000 });
    }
    );
    return false;
}
}
