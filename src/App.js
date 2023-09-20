import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import './index.css';
import ProfilePage from "./pages/ProfilePage";
import {Auth} from "./pages/Login";

function App() {

    const [auth, setAuth] = useState(false)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (!existingProduct) {
            setCart([...cart, {...product, quantity: 1}]);
        }
    };

    const removeFromCart = (productId) => {
        const newCart = cart.filter(item => item.id !== productId);
        setCart(newCart);
    };

    const updateProductQuantity = (productId, quantity) => {
        const newCart = cart.map(item =>
            item.id === productId ? {...item, quantity} : item
        );
        setCart(newCart);
    };

    if (auth === false) {
        return <Auth onSucesso={() => setAuth(true)}>

        </Auth>
    }

    return (
        <Router>
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src="/logo_riaceci_preto.png" alt="Riacecí Logo" className="logo-icon"/>
                    </Link>
                    <h1>Riacecí</h1>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/products">Produtos</Link>
                    <a
                        href="https://riaceci.s3.sa-east-1.amazonaws.com/Apresentac%CC%A7a%CC%83o+Comercial+Riaceci%CC%81+-+2023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{marginLeft: '2vw', color: 'black', textDecoration: 'none', marginRight: '30px'}}
                    >
                        Quem somos
                    </a>
                    <Link to="/profile">Meu Perfil</Link>
                    <Link to="/cart" className="logo-carrinho">
                        Carrinho
                        {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
                    </Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage addToCart={addToCart}/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart}
                                                       updateProductQuantity={updateProductQuantity}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
