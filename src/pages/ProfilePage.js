import React, {useEffect, useState} from 'react';
import LogoutService from "../LogoutService";
import CollapsibleOrder from "../CollapsibleOrder";
import axios from "axios";
import './styles/ProfilePage.css'

const USER_ROLES = {
    ADMIN: "ADMIN",
    FUNCTIONARY: "FUNCTIONARY",
    CUSTOMER: "CUSTOMER"
};

function ProfilePage() {
    const {role, cnpj} = localStorage;

    const [cnpjSearch, setCnpjSearch] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [showData, setShowData] = useState('');

    const fetchCustomerOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/find-order-by-cnpj/${cnpj}`);
            if (response.data) {
                setOrderData(response.data);
            } else {
                alert("Nenhum pedido encontrado para este CNPJ.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do pedido:", error);
        }
    };

    const fetchCustomerData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/find-by-cnpj/${cnpj}`);
            if (response.data) {
                setCustomerData(response.data);
            } else {
                alert("Nenhum cliente encontrado com este CNPJ.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do cliente:", error);
        }
    };

    const handleLogout = () => {
        LogoutService.logout();
    };

    const handleSearchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/find-order-by-cnpj/${cnpjSearch}`);
            if (response.data) {
                setOrderData(response.data);
                setShowData('order');
            } else {
                alert("Nenhum pedido encontrado para este CNPJ.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do pedido:", error);
        }
    };

    const handleSearchCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/find-by-cnpj/${cnpjSearch}`);
            if (response.data) {
                setCustomerData(response.data);
                setShowData('customer');
            } else {
                alert("Nenhum cliente encontrado com este CNPJ.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do cliente:", error);
        }
    };

    useEffect(() => {
        if (role === USER_ROLES.CUSTOMER) {
            fetchCustomerOrders();
            fetchCustomerData();
        }
    }, [role]);

    return (
        <div>
            <h1 className="profile-title">Perfil</h1>
            <p>Role: {role}</p>

            {(role === USER_ROLES.ADMIN || role === USER_ROLES.FUNCTIONARY) && (
                <div>
                    <input
                        type="text"
                        value={cnpjSearch}
                        onChange={(e) => setCnpjSearch(e.target.value)}
                        placeholder="Insira o CNPJ"
                    />
                    <button onClick={handleSearchOrder}>Buscar Pedido</button>
                    <button onClick={handleSearchCustomer}>Buscar Cliente</button>

                    {showData === 'order' && orderData && (
                        <div>
                            <h2>Pedido de {orderData.customerName}</h2>
                            {orderData.orders.map(order => (
                                <CollapsibleOrder key={order.orderId} order={order}/>
                            ))}
                        </div>
                    )}

                    {showData === 'customer' && customerData && (
                        <div>
                            <h2>Informações do Cliente</h2>
                            <p>ID: {customerData.id}</p>
                            <p>Nome: {customerData.name}</p>
                            <p>CNPJ: {customerData.cnpj}</p>
                            <p>Email: {customerData.email}</p>
                            <p>Tipo de Cliente: {customerData.customerType}</p>
                        </div>
                    )}
                </div>
            )}

            {role === USER_ROLES.CUSTOMER && (
                <div className="customer-section">
                    <div className="customer-data">
                        <h2>Meus Dados</h2>
                        {customerData && (
                            <>
                                <p>CNPJ: {customerData.cnpj}</p>
                                <p>Email: {customerData.email}</p>
                                <p>Tipo: {customerData.customerType}</p>
                            </>
                        )}
                    </div>
                    <div className="customer-orders">
                        <h2>PEDIDOS</h2>
                        {orderData && orderData.orders.map(order => (
                            <CollapsibleOrder key={order.orderId} order={order}/>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ProfilePage;
