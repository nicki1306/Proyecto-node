import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
