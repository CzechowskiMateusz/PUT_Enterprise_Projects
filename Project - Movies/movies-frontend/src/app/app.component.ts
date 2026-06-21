import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Sklep z filmami</h1>
    <nav>
      <a routerLink="/" style="margin-right: 15px;">Katalog Filmów</a>
      <a routerLink="/cart">Mój Koszyk</a>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}