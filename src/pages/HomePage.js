import React from 'react';
import './styles/HomePage.css';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div className="about-container">
            <div className="industry-section">
                <h2 className="industry-title">A indústria</h2>
                <p className="industry-description">
                    Nossa matriz está localizada em Pelotas/RS, que é considerada a Capital Nacional do Doce.
                </p>
                <p className="industry-description">
                    A fábrica foi construída e auditada com normas e requisitos especificados pela NESTLÉ®.
                </p>
                <p className="industry-description">
                    Possuímos autorização na utilização das marcas para a comunicação dos produtos.
                </p>
                <Link to="/products" className="shop-link">
                    <button className="shop-button">Conheça nossos produtos</button>
                </Link>
            </div>

            <div className="photos-section">
                <div className="photo photo-vertical">
                    <img src="https://riaceci.s3.sa-east-1.amazonaws.com/apresentacao_comercial_riaceci/pizza_alpino_ambiente.png" alt="FOTO1"/>
                </div>
                <div className="photo photo-horizontal">
                    <img src="https://riaceci.s3.sa-east-1.amazonaws.com/apresentacao_comercial_riaceci/pizza_pretigio_ambiente.png" alt="FOTO2"/>
                    <div className="photo-caption">Central California — The person who grew these was located in Central
                        California and, er, hopefully very well-compensated.
                    </div>
                </div>
            </div>

            <div className="recipes-section">
                <div className="recipes-content">
                    <h2 className="recipes-title">Receitas nestlé®</h2>
                    <div>
                        <div className="recipes-description">
                            Contamos com a expertise de um renomado Chef da NESTLÉ® Professional, que veio<br/>
                            até a nossa indústria auxiliar no desenvolvimento de toda a linha de produtos.
                        </div>
                        <div className="recipes-description">
                            A formulação da receita dos produtos Riacecí® possuem na sua composição 93% de<br/>
                            insumos fabricados pela NESTLÉ®.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
