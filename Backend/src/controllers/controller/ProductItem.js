import React from 'react';
import { addToCart } from '../api';

const ProductItem = ({ product }) => {
    const handleAddToCart = async () => {
        await addToCart(product._id);
        alert('Producto agregado al carrito');
    };

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p>{product.description}</p>
            <p className="text-green-600">${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 mt-2 rounded">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductItem;
