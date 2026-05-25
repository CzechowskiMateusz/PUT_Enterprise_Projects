import { useState } from "react";
import ProductItem from "./ProductItem";

function ProductList({products}) {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h1>List of products</h1>

            <label htmlFor="filterInput">Filtrowanie: </label>
            <input id="filterInput" type="text" value={filter} onChange={handleFilterChange}></input>

            <ul>
                {products
                    .filter((product) =>
                        product.title.toLowerCase().includes(filter.toLowerCase())
                    )
                    .map((product) => (
                        <ProductItem key={product.id} id={product.id} title={product.title} brand={product.brand} />
                    ))}
            </ul>
        </div>
    );
}

export default ProductList;