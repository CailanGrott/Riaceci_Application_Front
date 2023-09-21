import React, {useContext} from 'react';
import {AuthContext} from './AuthContext';
import LogoutService from "../LogoutService";  // Certifique-se de ajustar o caminho conforme necessário

function ProfilePage() {
    const handleLogout = () => {
        LogoutService.logout();
    };

    return (
        <div>
            <h1>Perfil</h1>

            {/* Informações disponíveis para todas as roles */}
            <p>Role: {localStorage.getItem('role')}</p>

            {/* Renderiza informações baseadas na role específica */}
            {localStorage.getItem('role') === "ADMIN" || localStorage.getItem('role') === "FUNCTIONARY" ? (
                <>
                    <p>User ID: {localStorage.getItem('userId')}</p>
                    <p>Login: {localStorage.getItem('login')}</p>
                </>
            ) : null}

            {localStorage.getItem('role') === "CUSTOMER" ? (
                <>
                    <p>Customer ID: {localStorage.getItem('customerId')}</p>
                    <p>CNPJ: {localStorage.getItem('cnpj')}</p>
                    {/* Adicione os campos restantes para o CUSTOMER aqui */}
                </>
            ) : null}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ProfilePage;
