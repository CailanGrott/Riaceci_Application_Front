import { useAuth } from "./AuthContext";
import { useState } from "react";
import './styles/Login.css';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = () => {
        setErrorMessage('');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                        setLogin(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleInputChange();
                    }}
                />
                <button onClick={() => handleLogin(login, password)}>
                    ok
                </button>
            </div>
        </div>
    );
}

export default Login;