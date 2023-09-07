import React, { useEffect, useState } from 'react';
import './styles/ProductsPage.css';

const ProductsPage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [flashingProductId, setFlashingProductId] = useState(null); // 1. Adicionando estado

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setFlashingProductId(product.id); // 2. Definindo o produto que está piscando
        setTimeout(() => setFlashingProductId(null), 1000); // Remove após 1 segundo
    };

    return (
        <div>
            <h1 className="products-title">Produtos</h1>
            <div className="products-container">
                {products.map(product => (
                    <div
                        key={product.id}
                        className={`product-card ${flashingProductId === product.id ? 'clicked' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        role="button"
                        tabIndex="0"
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleAddToCart(product);
                            }
                        }}
                    >
                        <img src={product.image} alt={product.name} />
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
