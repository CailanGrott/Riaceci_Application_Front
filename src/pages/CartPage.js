import React, {useContext, useState} from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import './styles/CartPage.css';

function CartPage({cart, removeFromCart, updateProductQuantity, clearCart}) {
    const { customerId } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmOrder = async () => {
        try {
            setIsLoading(true);
            const products = cart.map(product => ({
                id: product.id,
                quantity: product.quantity,
            }));

            const orderData = {
                customerId: Number(customerId),
                products,
            };

            const response = await axios.post('http://riaceci-application-env.eba-matirrr2.sa-east-1.elasticbeanstalk.com/orders/new-order', orderData);

            if (response.status === 201) {
                console.log('Pedido criado com sucesso');
                alert('Pedido criado com sucesso!'); // Feedback de sucesso
                clearCart(); // Limpar o carrinho
            }
        } catch (error) {
            console.error('Erro ao criar o pedido', error);
            // Aqui você pode adicionar qualquer lógica adicional para tratar erros na criação do pedido
        } finally {
            setIsLoading(false); // Remover o estado de carregamento
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Mostrar um loader enquanto a requisição está sendo processada
    }

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
                        <button className='confirm-button' onClick={handleConfirmOrder}>Confirmar Pedido</button>
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
