import './App.css';
import axios from 'axios';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
 const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error("Błąd podczas poiberania danych: ", error);
            });
    }, []);

const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList products={products} />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails products={products} />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
