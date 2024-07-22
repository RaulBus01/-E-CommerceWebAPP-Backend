const Cart = require('../models/cart');

exports.createCart = async (req, res) => {
    const newCart = new Cart({
        userId: req.params.id,
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
        const cart = await Cart.findOne({userId: req.params.id,});
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        const product = cart.products.find((product) => product.productId === req.body.productId);
        if (product) {
            await cart.updateOne({ $set: { "products.$[elem].quantity": product.quantity + req.body.quantity } }, { arrayFilters: [{ "elem.productId": req.body.productId }] });
            res.status(200).json("Product has been updated in cart");
            return;
        }
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            $push: {
                products: {
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                },
            },
        }, { new: true });

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json(err);
    }
};
exports.deleteProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id,});
        
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        
        const product = cart.products.find((p) => p.productId === req.params.productId);
        

        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }
    
        await cart.updateOne({ $pull: { products: { productId: req.params.productId } } });
        res.status(200).json("Product has been deleted from cart");
      
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteCart = async (req, res) => {
    try {
        
        const cart = await Cart.findOne({userId: req.params.id,});
        
        if (!cart) {
            res.status(404).json("User Cart not found");

            return;
        }
        await cart.delete();
        res.status(200).json("Cart has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}


exports.getCart = async (req, res) => {
    try {
        
        const cart = await Cart.findOne({
        userId: req.params.id,
        });

        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

