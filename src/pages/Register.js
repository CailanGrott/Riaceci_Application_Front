import { useState } from "react";
import { useAuth } from "./AuthContext";
import './styles/Register.css'

function Register() {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customerType, setCustomerType] = useState('Supermarket'); // Valor padrão
    const [errorMessage, setErrorMessage] = useState('');
    const { handleRegister: handleRegisterFromAuth } = useAuth();

    const validateFields = () => {
        if (!name || !cnpj || !email || !password) {
            setErrorMessage('Todos os campos são obrigatórios!');
            return false;
        }
        return true;
    };

    const handleRegister = () => {
        if (validateFields()) {
            handleRegisterFromAuth(name, cnpj, email, password, customerType);
        }
    }

    return (
        <div className="container-register-customer">
            <div className="register-form-customer">
                <input className="input-customer" type="text" placeholder="Name"
                       onChange={e => setName(e.target.value)}/>
                <input className="input-customer" type="text" placeholder="CNPJ"
                       onChange={e => setCnpj(e.target.value)}/>
                <input className="input-customer" type="email" placeholder="Email"
                       onChange={e => setEmail(e.target.value)}/>
                <input className="input-customer" type="password" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}/>
                <select className="input-customer" onChange={e => setCustomerType(e.target.value)}>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Store">Store</option>
                    <option value="Convenience_Store">Convenience Store</option>
                    <option value="Coffee_Shop">Coffee Shop</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Pastry_Shop">Pastry Shop</option>
                </select>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button className="register-button"
                        onClick={() => handleRegister(name, cnpj, email, password, customerType)}>
                    Register
                </button>
            </div>
        </div>
    );

}

export default Register;
