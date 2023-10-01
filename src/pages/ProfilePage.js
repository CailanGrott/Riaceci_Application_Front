import React, {useEffect, useState} from 'react';
import LogoutService from "../LogoutService";
import CollapsibleOrder from "../CollapsibleOrder";
import axios from "axios";
import './styles/ProfilePage.css'
import {useNavigate} from 'react-router-dom';
import {AiFillDelete} from "react-icons/ai";

const USER_ROLES = {
    ADMIN: "ADMIN",
    FUNCTIONARY: "FUNCTIONARY",
    CUSTOMER: "CUSTOMER"
};

function ProfilePage() {
    const {role, cnpj} = localStorage;
    const navigate = useNavigate();
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

    const handleDeleteCustomer = async () => {
        try {
            await axios.delete(`http://localhost:8080/customer/delete-customer/cnpj/${cnpjSearch}`);
            alert("Cliente excluído com sucesso!");
            setCnpjSearch('');  // Limpar o input após exclusão.
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente. Verifique o CNPJ e tente novamente.");
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
            {(role === USER_ROLES.ADMIN || role === USER_ROLES.FUNCTIONARY) && (
                <div>
                    <div className="input-button-container">
                        <input className="find-customer"
                               type="text"
                               value={cnpjSearch}
                               onChange={(e) => setCnpjSearch(e.target.value)}
                               placeholder="Insira o CNPJ"
                        />
                        <AiFillDelete className="lixeira" size={24} onClick={handleDeleteCustomer}/> {/* Ícone de lixeira */}
                        <button onClick={handleSearchOrder}>Buscar Pedido</button>
                        <button onClick={handleSearchCustomer}>Buscar Cliente</button>
                        <button onClick={() => navigate('/register-product')}>Registrar Produto</button>
                        <button onClick={() => navigate('/registerEmployee')}>Registrar Funcionário</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    {showData === 'order' && orderData && (
                        <div className="customer-info">
                            <h2>Pedido de {orderData.customerName}</h2>
                            {orderData.orders.map(order => (
                                <CollapsibleOrder key={order.orderId} order={order}/>
                            ))}
                        </div>
                    )}

                    {showData === 'customer' && customerData && (
                        <div className="customer-info">
                            <h2>Informações do Cliente</h2>
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
                    <div
                        className="customer-data blank-card"> {/* Aplicamos "blank-card" para aproveitar o mesmo estilo */}
                        <h2 className="summary-title meus-dados">Meus
                            Dados</h2> {/* "summary-title" para manter a consistência */}
                        {customerData && (
                            <>
                                <p>CNPJ: {customerData.cnpj}</p>
                                <p>Email: {customerData.email}</p>
                                <p>Tipo: {customerData.customerType}</p>
                                <div className="button-container">
                                    <button className="confirm-button" onClick={handleLogout}>Logout</button>
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        className="customer-orders cart-items-container"> {/* "cart-items-container" para manter a mesma estrutura */}
                        <h2 className="summary-title pedidos">PEDIDOS</h2>
                        {orderData && orderData.orders.map(order => (
                            <CollapsibleOrder key={order.orderId} order={order} className="order-card"/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
