import express from 'express';
import { getAllProducts } from '../controllers/productController.js';
import passport from 'passport';


const router = express.Router();

router.get('/', getAllProducts);
router.post('/', passport.authenticate('jwt', { session: false }), createProduct);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateProduct);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct);


// Otras rutas para productos

export default router;
