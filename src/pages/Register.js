import {useState} from "react";
import {useAuth} from "./AuthContext";
import './styles/Register.css'

function Register() {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customerType, setCustomerType] = useState('Supermarket'); // Valor padrão
    const {handleRegister} = useAuth();

    return (
        <div className="register-container">
            <div className="register-form">
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="CNPJ" onChange={e => setCnpj(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <select onChange={e => setCustomerType(e.target.value)}>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Store">Store</option>
                    <option value="Convenience_Store">Convenience Store</option>
                    <option value="Coffee_Shop">Coffee Shop</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Pastry_Shop">Pastry Shop</option>
                </select>
                <button onClick={() => handleRegister(name, cnpj, email, password, customerType)}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
