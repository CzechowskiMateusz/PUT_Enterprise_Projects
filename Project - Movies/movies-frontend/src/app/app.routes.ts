import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { CartComponent } from './components/cart/cart.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];