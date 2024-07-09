import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductItem key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;

