import React from 'react';
import './styles/CartPage.css';

function CartPage({cart, removeFromCart, updateProductQuantity}) {
    return (
        <div className='body'>
            <div className='order-title'>
                <p><h1>Pedidos</h1></p>
            </div>
            {cart.map(product => (
                <div className='container-detalhes'>
                    <div className='aba-produto' key={product.id}>
                        <div className='imagem-produto-pedido'>
                            <img src={product.image} alt={product.name}/>
                            <div className="product-info">
                                <h2>{product.name}</h2>
                                <p>R${product.price.toFixed(2)} each</p>
                                <div className="quantity-controls">
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => updateProductQuantity(product.id, Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="total-price">
                            R${(product.price * product.quantity).toFixed(2)}
                        </div>
                        <button onClick={() => removeFromCart(product.id)}>Remove</button>
                    </div>
                    <div className='resumo-pedido'>

                    </div>
                </div>
            ))}
        </div>
    );
}


export default CartPage;
