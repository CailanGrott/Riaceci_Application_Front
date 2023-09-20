import React, { useEffect, useState } from 'react';
import './styles/ProductsPage.css';

const ProductsPage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [flashingProductId, setFlashingProductId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/products/find-products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setFlashingProductId(product.id);
        setTimeout(() => setFlashingProductId(null), 1000);
    };

    return (
        <div>
            <h1 className="products-title">Produtos</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`product-card ${flashingProductId === product.id ? 'flashing' : ''}`}
                        onClick={() => handleAddToCart(product)}
                    >
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-text">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">R$ {product.price.toFixed(2)}</p>
                            <p className="product-description">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
