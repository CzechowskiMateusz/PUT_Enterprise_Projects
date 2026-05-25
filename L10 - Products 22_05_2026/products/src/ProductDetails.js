import { useParams, Link } from "react-router-dom";

function ProductDetails({ products }) {
    const {id} = useParams();
    const filteredProducts = products.filter((p) => p.id === parseInt(id));
    if(filteredProducts.length === 0){
        return null;
    }

    const product = filteredProducts[0];
    return (
        <div>
            <h2>{product.title}</h2>

            Category: {product.category} <br />
            Brand: {product.brand} <br />
            Description: {product.description} <br />
            Price: ${product.price} <br />
            <br />

            <img src={product.thumbnail} alt={product.title} />

            <Link to="/">Powrót do listy produktów</Link>
        </div>
    );
}
export default ProductDetails;