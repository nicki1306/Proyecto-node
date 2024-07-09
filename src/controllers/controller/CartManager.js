import Cart from '../models/Carts.models';
import product from '../models/Products.model';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            const newCart = new Cart({
                user: req.user.id,
                products: [{ product: productId, quantity: 1 }]
            });
            await newCart.save();
            res.status(201).json(newCart);
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });    
            }       
            await cart.save();
            res.status(200).json(cart);
        }   
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


