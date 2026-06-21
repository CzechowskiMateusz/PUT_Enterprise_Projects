import { Component, OnInit } from '@angular/core';
import { ApiService, CartDTO } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Mój Koszyk</h2>

    <div *ngIf="cart && cart.movies.length > 0; else emptyCart">
      <table>
        <tr>
          <th>Tytuł</th>
          <th>Cena</th>
          <th>Akcja</th>
        </tr>
        <tr *ngFor="let movie of cart.movies">
          <td>{{ movie.title }}</td>
          <td>{{ movie.price }} PLN</td>
          <td>
            <button (click)="removeFromCart(movie.id)" style="background-color: #d32f2f;">Usuń</button>
          </td>
        </tr>
      </table>

      <div style="text-align: right; margin-top: 20px; font-size: 1.3rem; padding: 15px; background-color: var(--accent-color); border-radius: 8px;">
        <strong>Suma do zapłaty: <span style="color: var(--primary-color);">{{ cart.totalPrice | number:'1.2-2' }} PLN</span></strong>
      </div>
    </div>

    <ng-template #emptyCart>
      <div class="empty-cart-msg">
        <p>Twój koszyk jest aktualnie pusty.</p>
        <button routerLink="/" style="margin-top: 15px;">Wróć do sklepu</button>
      </div>
    </ng-template>
  `
})
export class CartComponent implements OnInit {
  cart?: CartDTO;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.getCart().subscribe(data => this.cart = data);
  }

  removeFromCart(id: number) {
    this.api.removeFromCart(id).subscribe(() => {
      this.loadCart();
    });
  }
}