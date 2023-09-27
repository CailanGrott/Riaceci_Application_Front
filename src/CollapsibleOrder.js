import React, {useState} from 'react';

function CollapsibleOrder({order}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                Pedido #{order.orderId}
            </button>

            {isOpen && (
                <div>
                    <p>Data do Pedido: {order.orderDate}</p>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>
                                {item.name} - Qtd: {item.quantity} UND- Total: R$ {item.total}
                            </li>
                        ))}
                    </ul>
                    <p>Valor Total do Pedido: R$ {order.totalValue}</p>
                </div>
            )}
        </div>
    );
}

export default CollapsibleOrder;
