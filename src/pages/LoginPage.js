import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                login: username,
                password
            });

            if (response.data && response.data.token) {
                onLogin(response.data.token);
            } else {
                setError('Erro no login. Por favor, tente novamente.');
            }
        } catch (err) {
            setError('Erro no login. Por favor, tente novamente.');
        }

        setLoading(false);
    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome de usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="register-link">
                Novo por aqui? <Link to="/register">Cadastre-se</Link>
            </div>
        </div>
    );
}

export default LoginPage;
