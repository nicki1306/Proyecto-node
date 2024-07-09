import React from 'react';
import ProductList from '../controller/ProductList';

const Home = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Productos</h1>
            <ProductList />
        </div>
    );
};

export default Home;
