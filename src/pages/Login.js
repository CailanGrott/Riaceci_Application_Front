import axios from "axios";

export const Auth = ({onSucesso}) => {
    const handle = async (login, senha) => {
        const {data} = await axios.post('http://localhost:8080/auth/login', {login, senha});
        //     se sucesso
        localStorage.setItem('token', data)
        onSucesso()
    }


    return <div>
        <input type="text"/>
        <input type="password"/>
        <button onClick={handle}>ok</button>
    </div>
}