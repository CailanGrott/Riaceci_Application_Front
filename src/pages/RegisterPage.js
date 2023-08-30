import React, { useState } from 'react';
import './styles/LoginPage.css';
import axios from 'axios';

function RegisterPage() {
    const [registerData, setRegisterData] = useState({ login: '', senha: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/register', registerData);
            setSuccess('Cadastro realizado com sucesso!');
        } catch (err) {
            setError('Erro ao realizar cadastro!');
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login:</label>
                    <input type="text" name="login" value={registerData.login} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" value={registerData.senha} onChange={handleInputChange} required />
                </div>
                <div>
                    <button type="submit">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
