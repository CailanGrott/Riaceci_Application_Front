import {useAuth} from "./AuthContext";
import {useState} from "react";

function RegisterEmployee() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ADMIN'); // Definindo 'ADMIN' como padrão, mas você pode ajustar conforme necessário

    const { handleRegisterEmployee } = useAuth();

    const onSubmit = () => {
        handleRegisterEmployee(login, password, role);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="ADMIN">ADMIN</option>
                <option value="FUNCTIONARY">FUNCIONÁRIO</option>
                <option value="CUSTOMER">CUSTOMER</option>
            </select>
            <button onClick={onSubmit}>Registrar Funcionário</button>
        </div>
    );
}

export default RegisterEmployee;