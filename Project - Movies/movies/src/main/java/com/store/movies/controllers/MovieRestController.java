package com.store.movies.controllers;

import com.store.movies.models.Movie;
import com.store.movies.repositiories.MovieRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/movies")
public class MovieRestController {

    private final MovieRepository movieRepository;

    public MovieRestController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public Iterable<Movie> getMovies(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return movieRepository.findByCategoryIgnoreCase(category);
        }
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Long id) {
        return movieRepository.findById(id).orElse(null);
    }
}