import { useAuth } from "./AuthContext";
import {useEffect, useState} from "react";
import './styles/Login.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    })

    const handleInputChange = () => {
        setErrorMessage('');
    };

    return (
        <div className="container-register-customer"> {/* Similar className for consistency */}
            <div className="login-form-customer"> {/* Similar className for consistency */}
                <input
                    className="input-customer"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                        setLogin(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    className="input-customer"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleInputChange();
                    }}
                />
                <div className="button-group"> {/* Div envolvendo os botões */}
                    <button className="register-button login-button" onClick={() => handleLogin(login, password)}>
                        Login
                    </button>
                    <button className="register-button" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;