import axios from 'axios';
import { config } from './config.js';

const api = axios.create({
    baseURL: config.SERVER
});

export const getProducts = () => api.get('/products');
export const register = (userdata) => api.post('/auth/register', userdata);
export const login = (userdata) => api.post('/auth/login', userdata);   
export const addToCart = (productId) => api.post('/cart', { productId });



export default api;