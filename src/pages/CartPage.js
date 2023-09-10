import React from 'react';
import {AiFillDelete} from 'react-icons/ai';  // Importando o ícone de lixeira
import './styles/CartPage.css';

function CartPage({cart, removeFromCart, updateProductQuantity}) {
    return (
        <div>
            <h1 className='order-title'>Pedido</h1>
            <div className='color-area'>
                <div className='blank-card'>
                    <div className='summary-container'>
                        <h2 className='summary-title'>Resumo</h2>
                        <div className='summary-content'>
                            <div className='summary-item'>
                                <span className='summary-item-label'>Total:</span>
                                <span className='summary-item-value'>
                    R$ {cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='confirm-button'>Confirmar Pedido</button>
                    </div>
                </div>
                <div className="cart-items-container">
                    {cart.map((product, index) => (
                        <div className="cart-product-card">
                            <img src={product.image} alt={product.name} className="cart-product-image"/>
                            <div className="cart-product-details">
                                <div className="cart-product-header">
                                    <h2 className="cart-product-name">{product.name}</h2>
                                    <p className="cart-product-total">R$ {(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                                <p className="cart-product-unit-price">R$ {product.price.toFixed(2)}</p>
                                <div className="cart-product-quantity-control">
                                    <p>Qtd:</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => updateProductQuantity(product.id, Math.max(1, e.target.value))}
                                    />
                                </div>
                                <div className="cart-product-remove" onClick={() => removeFromCart(product.id)}>
                                    <AiFillDelete
                                        size={24}/> {/* Adicionando o ícone de lixeira com um tamanho personalizado */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default CartPage;
