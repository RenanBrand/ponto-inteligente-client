import { Funcionario } from './../../shared/models/funcionario.model';
import { HttpUtilService } from './../../shared/services/http-util.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AdminGuard implements CanActivate {

  constructor(
    private httpUtilService: HttpUtilService,
    private router: Router) {}

  canActivate(): boolean {
    if(this.httpUtilService.obterPerfil() == 'ROLE_ADMIN'){
      return true;
    }
    this.router.navigate(['/funcionario']);
    return false;
  }
}
