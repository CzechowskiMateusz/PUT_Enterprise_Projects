package com.store.movies.repositiories;

import com.store.movies.models.Movie;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface MovieRepository extends CrudRepository<Movie, Long> {
    List<Movie> findByCategoryIgnoreCase(String category);
}