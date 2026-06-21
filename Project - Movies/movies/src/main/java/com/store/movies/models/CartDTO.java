package com.store.movies.models;

import java.math.BigDecimal;
import java.util.List;

public class CartDTO {
    public List<Movie> movies;
    public BigDecimal totalPrice;

    public CartDTO(List<Movie> movies, BigDecimal totalPrice) {
        this.movies = movies;
        this.totalPrice = totalPrice;
    }
}