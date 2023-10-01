import {useAuth} from "./AuthContext";
import {useState} from "react";
import './styles/RegisterEmployee.css';

function RegisterEmployee() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ADMIN'); // Definindo 'ADMIN' como padrão, mas você pode ajustar conforme necessário

    const {handleRegisterEmployee} = useAuth();

    const onSubmit = () => {
        handleRegisterEmployee(login, password, role);
    };

    return (
        <div className="register-employee">
            <h1 className="register-employee-title">Cadastrar novo funcionário</h1>
            <input
                className="input-employee-login"
                type="text"
                placeholder="Login"
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <input
                className="input-employee-password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <select
                className="select-employee-role"
                value={role}
                onChange={e => setRole(e.target.value)}
            >
                <option value="ADMIN">ADMIN</option>
                <option value="FUNCTIONARY">FUNCIONÁRIO</option>
            </select>
            <button className="button-register-employee" onClick={onSubmit}>
                Registrar Funcionário
            </button>
        </div>
    );
}

export default RegisterEmployee;