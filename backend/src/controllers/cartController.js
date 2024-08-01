const Cart = require('../models/Cart');



exports.addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        
        
        const product = cart.products.find(p => p.product.toString() === req.body.productId);
        if (product) {
            await Cart.updateOne(
                { "products.product": req.body.productId },
                { $inc: { "products.$.quantity": req.body.quantity } }
            );
            res.status(200).json("Product has been updated in cart");
            return;
        }

        cart.products.push({
            product: req.body.productId,
            quantity: req.body.quantity,
        });

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });

        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        const product = cart.products.find(p => p.product.toString() === req.body.productId);
        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }

        await Cart.updateOne(
            { userId: req.body.id },
            { $pull: { products: { product: req.body.productId } } }
        );
        res.status(200).json("Product has been deleted from cart");
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });

        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        if (cart.products.length === 0) {
            res.status(400).json("Cart is already empty");
            return;
        }

        cart.products = [];
        await cart.save();
        res.status(200).json("Cart has been emptied");
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id }).populate('products.product');

        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        res.json(cart.products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.product');
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.editProductQuantityInCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        const product = cart.products.find(p => p.product.toString() === req.body.productId);
        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }
        console.log(req.body);

        if (req.body.quantity < 0) {
            return res.status(400).json("Quantity should be greater than 0");
            
        }

        if (req.body.quantity === 0) {
            cart.products = cart.products.filter(p => p.product.toString() !== req.body.productId);
            await cart.save();
            return res.status(200).json("Product has been removed from cart");
        }

       cart.products.map(p => {
            if (p.product.toString() === req.body.productId) {
                p.quantity = req.body.quantity;
            }
            return p;
        });
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};
