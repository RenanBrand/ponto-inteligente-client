

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from './../../models/login.model';
import { LoginService } from './../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  logar(){
    if (this.form.invalid){
      this.snackBar.open('Dados invalidos', 'Error', { duration: 5000 });
      return;

    }
    const login: Login = this.form.value;
    this.loginService.logar(login)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        localStorage['token'] = data ['data']['token'];
        const usuarioData = JSON.parse(
          atob(data['data']['token'].split('.')[1]));
        console.log(JSON.stringify(usuarioData));
        if (usuarioData['role'] == 'ROLE_ADMIN'){
          alert('Deve ser direcionado para a pagina de admin');
          this.router.navigate(['/admin']);
        } else {
          alert('Deve ser direcionado para a pagina de Funcionário');
          this.router.navigate(['/funcionario']);
        }

      },
      err => {
        console.log(JSON.stringify(err));
        let msg: string = 'Tente novamente em instantes';
        if (err['status'] == 401){
          msg = 'Email e/ou senha invalido(s)';
        }
        this.snackBar.open(msg, 'Error', {duration: 5000});

      }
    )
  }
}
