import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import './index.css';

function App() {
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
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/cart" className="logo-carrinho">
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
