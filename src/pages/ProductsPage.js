import React, {useEffect, useState} from 'react';
import {AiFillDelete} from 'react-icons/ai';  // Importando o ícone
import axios from 'axios';
import './styles/ProductsPage.css';

const USER_ROLES = {
    ADMIN: "ADMIN",
    FUNCTIONARY: "FUNCTIONARY",
    CUSTOMER: "CUSTOMER"
};

const ProductsPage = ({addToCart}) => {
    const {role} = localStorage; // Pegando a role do localStorage
    const [products, setProducts] = useState([]);
    const [flashingProductId, setFlashingProductId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/products/find-products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleDeleteProduct = (e, productId) => {
        e.stopPropagation();

        axios.delete(`http://localhost:8080/products/delete-product/id/${productId}`)
            .then(() => {
                setProducts(products.filter(p => p.id !== productId));
            })
            .catch(error => {
                console.error("Erro ao excluir o produto:", error);
                alert("Não foi possível excluir o produto.");
            });
    };

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
                        <img src={product.image} alt={product.name} className="product-image"/>
                        <div className="product-text">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">R$ {product.price.toFixed(2)}</p>
                            <p className="product-description">{product.description}</p>
                            {role === USER_ROLES.ADMIN && (
                                <div className="delete-icon" onClick={(e) => handleDeleteProduct(e, product.id)}>
                                    <AiFillDelete size={24}/>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
