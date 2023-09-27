import React, { useState } from 'react';

function OrderCard({ order }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="order-card-container" onClick={handleToggle}>
            <h2 className="order-card-title">Pedido {order.orderId}</h2>
            {isOpen && (
                <div className="order-card-details">
                    <p>Data do Pedido: {order.orderDate}</p>
                    <div className="order-card-items">
                        {order.items.map(item => (
                            <div className="order-card-item" key={item.id}>
                                <p>Produto: {item.name}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Preço: R${item.price.toFixed(2)}</p>
                                <p>Total do Item: R${item.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <p>Valor Total do Pedido: R${order.totalValue.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default OrderCard;
