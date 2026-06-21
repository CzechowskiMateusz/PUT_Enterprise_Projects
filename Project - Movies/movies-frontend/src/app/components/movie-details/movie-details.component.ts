import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Movie } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="movie" style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      <h2>{{ movie.title }}</h2>
      <hr>
      <p style="font-size: 1.1rem; margin-bottom: 10px;"><strong>Kategoria:</strong> {{ movie.category }}</p>
      <p style="font-size: 1.1rem; margin-bottom: 10px;"><strong>Rok produkcji:</strong> {{ movie.productionYear }}</p>
      <p style="font-size: 1.1rem; margin-bottom: 10px;"><strong>Cena:</strong> {{ movie.price }} PLN</p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: var(--background-color); border-radius: 5px;">
        <strong>Opis filmu:</strong><br>
        {{ movie.description }}
      </div>

      <div style="margin-top: 20px;">
        <button (click)="addToCart(movie.id)" style="margin-right: 15px;">Dodaj do koszyka</button>
        <button routerLink="/" style="background-color: #6a1b9a;">Wróć do listy</button>
      </div>
    </div>
    
    <div *ngIf="!movie">
      <p>Ładowanie szczegółów filmu...</p>
    </div>
  `
})
export class MovieDetailsComponent implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getMovie(id).subscribe(data => this.movie = data);
    }
  }

  addToCart(id: number) {
    this.api.addToCart(id).subscribe(() => alert('Dodano do koszyka!'));
  }
}