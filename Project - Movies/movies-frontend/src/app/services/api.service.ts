import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  category: string;
  productionYear: number;
  description: string;
  price: number;
}

export interface CartDTO {
  movies: Movie[];
  totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMovies(category?: string): Observable<Movie[]> {
    let url = `${this.baseUrl}/movies`;
    if (category) url += `?category=${category}`;
    return this.http.get<Movie[]>(url);
  }

  getCart(): Observable<CartDTO> {
    return this.http.get<CartDTO>(`${this.baseUrl}/cart`, { withCredentials: true });
  }

  addToCart(movieId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cart/add/${movieId}`, {}, { withCredentials: true });
  }

  removeFromCart(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cart/remove/${movieId}`, { withCredentials: true });
  }
  
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }
}