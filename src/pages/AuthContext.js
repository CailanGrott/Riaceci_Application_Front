import {createContext, useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {toast} from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [customerId, setCustomerId] = useState('');
    const [userId, setUserId] = useState('');
    const [login, setLogin] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (login, password) => {
        try {
            const response = await axios.post('http://riaceci-application-env.eba-matirrr2.sa-east-1.elasticbeanstalk.com/auth/login', {login, password});
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
        } catch (error) {
            toast.error('Verifique suas credenciais!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error(`Erro na requisição: ${error.message}`);
        }
    };

    const handleRegister = async (name, cnpj, email, password, customerType) => {
        try {
            const response = await axios.post('http://riaceci-application-env.eba-matirrr2.sa-east-1.elasticbeanstalk.com/customer/new-customer', {
                name,
                cnpj,
                email,
                password,
                customerType
            });

            const statusCode = response.status;

            if (statusCode === 201) {
                await handleLogin(cnpj, password);
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
        }
    };

    const handleRegisterEmployee = async (login, password, role) => {
        try {
            const response = await axios.post('http://riaceci-application-env.eba-matirrr2.sa-east-1.elasticbeanstalk.com/auth/register', {
                login,
                password,
                role
            });

            const statusCode = response.status;

            if (statusCode === 200) {
                alert('Funcionário registrado com sucesso!');
            } else {
                alert('Falha ao registrar o funcionário.');
            }
        } catch (error) {
            console.error("Erro ao registrar funcionário:", error);
        }
    };

    return (
        <AuthContext.Provider value={{handleLogin, handleRegister, handleRegisterEmployee, customerId}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}