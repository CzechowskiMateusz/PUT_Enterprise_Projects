import { Component, OnInit } from '@angular/core';
import { ApiService, Movie } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h2>Katalog Filmów</h2>
    <div class="search-container">
      <input type="text" [(ngModel)]="searchCategory" placeholder="np. Komedia">
      <button (click)="filterMovies()">Szukaj</button>
      <button (click)="clearFilter()">Wyczyść</button>
    </div>

    <table>
      <tr><th>Tytuł</th><th>Kategoria</th><th>Cena</th><th>Akcje</th></tr>
      <tr *ngFor="let movie of movies">
        <td>{{ movie.title }}</td>
        <td>{{ movie.category }}</td>
        <td>{{ movie.price }} PLN</td>
        <td>
          <button (click)="addToCart(movie.id)" style="margin-right: 10px;">Do koszyka</button>
          <button [routerLink]="['/movie', movie.id]" style="background-color: #6a1b9a;">Szczegóły</button>
        </td>
      </tr>
    </table>
  `
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchCategory: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadMovies(); }

  loadMovies(category?: string) {
    this.api.getMovies(category).subscribe(data => this.movies = data);
  }

  filterMovies() { this.loadMovies(this.searchCategory); }
  clearFilter() { this.searchCategory = ''; this.loadMovies(); }
  
  addToCart(id: number) {
    this.api.addToCart(id).subscribe(() => alert('Dodano do koszyka!'));
  }
}