import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ponto-inteligente';
  constructor(private router: Router){}

 ngOnInit() {

 }

sair(){
  delete localStorage ['token'];
  this.router.navigate(['/']);
}
autenticado(): boolean {
  return localStorage['token'];
}

}
