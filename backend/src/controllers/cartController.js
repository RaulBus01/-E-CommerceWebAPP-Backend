const Cart = require('../models/Cart');

exports.createCart = async (req, res) => {
    const newCart = new Cart({
        userId: req.body.id,
        products: [],
    });

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        
        
        const product = cart.products.find(p => p.productId.toString() === req.body.productId);
        if (product) {
            await Cart.updateOne(
                { "products.productId": req.body.productId },
                { $inc: { "products.$.quantity": req.body.quantity } }
            );
            res.status(200).json("Product has been updated in cart");
            return;
        }

        cart.products.push({
            productId: req.body.productId,
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

        const product = cart.products.find(p => p.productId.toString() === req.body.productId);
        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }

        await Cart.updateOne(
            { userId: req.body.id },
            { $pull: { products: { productId: req.body.productId } } }
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
        const cart = await Cart.findOne({ userId: req.params.id }).populate('products.productId');

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
        const carts = await Cart.find().populate('products.productId');
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

        const product = cart.products.find(p => p.productId.toString() === req.body.productId);
        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }

        if (req.body.quantity < 0) {
            res.status(400).json("Quantity should be greater than 0");
            return;
        }

        if (req.body.quantity === 0) {
            await Cart.updateOne(
                { userId: req.body.id },
                { $pull: { products: { productId: req.body.productId } } }
            );
            res.status(200).json("Product has been deleted from cart");
            return;
        }

        await Cart.updateOne(
            { "products.productId": req.body.productId },
            { $set: { "products.$.quantity": req.body.quantity } }
        );
        res.status(200).json("Product quantity has been updated in cart");
    } catch (err) {
        res.status(500).json(err);
    }
};
