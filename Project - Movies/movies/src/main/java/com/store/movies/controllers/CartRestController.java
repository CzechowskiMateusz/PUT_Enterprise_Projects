package com.store.movies.controllers;

import com.store.movies.models.CartDTO;
import com.store.movies.repositiories.MovieRepository;
import com.store.movies.services.ShoppingCart;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/cart")
public class CartRestController {

    private final ShoppingCart cart;
    private final MovieRepository movieRepository;

    public CartRestController(ShoppingCart cart, MovieRepository movieRepository) {
        this.cart = cart;
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public CartDTO getCart() {
        return new CartDTO(cart.getMovies(), cart.getTotalPrice());
    }

    @PostMapping("/add/{id}")
    public void addToCart(@PathVariable Long id) {
        movieRepository.findById(id).ifPresent(cart::addMovie);
    }

    @DeleteMapping("/remove/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cart.removeMovie(id);
    }
}