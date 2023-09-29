import React, { useState } from 'react';
import axios from 'axios';

function RegisterProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleRegisterProduct = async () => {
        try {
            const productData = {
                name,
                description,
                price: Number(price), // Convertendo a string para número
                image
            };

            const response = await axios.post('http://localhost:8080/products/new-product', productData);

            if (response.status === 201) {
                alert('Produto registrado com sucesso!');
            }
        } catch (error) {
            console.error("Erro ao registrar produto:", error);
            alert("Erro ao registrar o produto.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL da Imagem"
                value={image}
                onChange={e => setImage(e.target.value)}
            />
            <button onClick={handleRegisterProduct}>Registrar Produto</button>
        </div>
    );
}

export default RegisterProduct;
