import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        }
    }, [authToken]);

    const logout = () => {
        setIsLoggedIn(false);
        setAuthToken(null);
        localStorage.removeItem('authToken');
    }

    return (
        <Router>
            {isLoggedIn ? (
                <header>
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo_riaceci_preto.png" alt="Riacecí Logo" className="logo-icon"/>
                        </Link>
                        <h1>Riacecí</h1>
                    </div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/about">About</Link>
                        <Link to="/cart" className="logo-carrinho">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </Link>
                        <Link to="/logout" onClick={logout}>Logout</Link>
                    </nav>
                </header>
            ) : null}

            <Routes>
                <Route path="/" element={isLoggedIn ? <HomePage/> : <Navigate to="/login" replace />} />
                <Route path="/products" element={isLoggedIn ? <ProductsPage/> : <Navigate to="/login" replace />} />
                <Route path="/about" element={isLoggedIn ? <AboutPage/> : <Navigate to="/login" replace />} />
                <Route path="/cart" element={isLoggedIn ? <CartPage/> : <Navigate to="/login" replace />} />
                <Route
                    path="/login"
                    element={
                        !isLoggedIn
                            ? <LoginPage onLogin={(token) => { setIsLoggedIn(true); setAuthToken(token); }} />
                            : <Navigate to="/" replace />
                    }
                />
                <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" replace />} />
                <Route path="/logout" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
