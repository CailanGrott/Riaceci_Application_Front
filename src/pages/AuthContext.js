import {createContext, useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [roles, setRole] = useState([]);
    const navigate = useNavigate();

    const handleLogin = async (login, senha) => {
        const response = await axios.post('http://localhost:8080/auth/login', {login, senha});

        const statusCode = response.status;
        const responseData = response.data;

        console.log(`Status Code: ${statusCode}`);

        if (statusCode === 200) {

            localStorage.setItem('token', responseData);
            const decodedToken = jwtDecode(responseData);

            if (decodedToken && decodedToken.CARGOS) {
                console.log(decodedToken.CARGOS);
                setRole(decodedToken.CARGOS);
                localStorage.setItem('role', decodedToken.CARGOS)
                localStorage.setItem('sub', decodedToken.sub)
                localStorage.setItem('nome', decodedToken.Nome)

                navigate('/inicio');
            }
        }
    };


    return (
        <AuthContext.Provider value={{roles, handleLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}