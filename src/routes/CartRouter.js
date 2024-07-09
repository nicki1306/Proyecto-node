import express from 'express';
import { getCart } from '../controllers/controller/CartManager.js';

const router = express.Router();

router.get('/', getCart);

// Otras rutas para el carrito

export default router;
