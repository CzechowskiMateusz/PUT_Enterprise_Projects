package com.store.movies.services;

import com.store.movies.models.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@SessionScope
public class ShoppingCart {
    private List<Movie> movies = new ArrayList<>();

    public void addMovie(Movie movie) {
        movies.add(movie);
    }

    public void removeMovie(Long movieId) {
        movies.removeIf(m -> m.getId().equals(movieId));
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public BigDecimal getTotalPrice() {
        return movies.stream()
                .map(Movie::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}