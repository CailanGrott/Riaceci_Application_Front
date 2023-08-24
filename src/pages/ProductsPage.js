import React, {useEffect, useState} from 'react';
import './styles/ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h1 className="products-title">Produtos</h1>
            <div className="products-container">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name}/>
                        <div className="product-card-content">
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
