import {createContext, useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [customerId, setCustomerId] = useState('');
    const [userId, setUserId] = useState('');
    const [login, setLogin] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (login, password) => {
        const response = await axios.post('http://localhost:8080/auth/login', {login, password});
        console.log(`login: ${login}`);
        console.log(`password: ${password}`);
        const statusCode = response.status;
        const responseData = response.data.token;

        console.log(`Status Code: ${statusCode}`);

        if (statusCode === 200) {

            localStorage.setItem('token', responseData);
            const decodedToken = jwtDecode(responseData);

            if (decodedToken && decodedToken.role) {
                setUserId(decodedToken.userId)
                setLogin(decodedToken.login)
                setCustomerId(decodedToken.customerId)
                setCnpj(decodedToken.cnpj)
                setRole(decodedToken.role);

                localStorage.setItem('userId', decodedToken.userId)
                localStorage.setItem('login', decodedToken.login)
                localStorage.setItem('customerId', decodedToken.customerId)
                localStorage.setItem('cnpj', decodedToken.cnpj)
                localStorage.setItem('role', decodedToken.role)

                navigate('/home');
            }
        }
    };


    return (
        <AuthContext.Provider value={{handleLogin, customerId}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}