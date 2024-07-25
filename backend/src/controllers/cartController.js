const Cart = require('../models/cart');

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
        const cart = await Cart.findOne({userId: req.body.id,});
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
        const cart = await Cart.findOne({userId: req.body.id,});
        
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        
        const product = cart.products.find((product) => product.productId === req.body.productId);
        

        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }
    
        await cart.updateOne({ $pull: { products: { productId: req.body.productId } } });
        res.status(200).json("Product has been deleted from cart");
      
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteCart = async (req, res) => {
        try {
          const cart = await Cart.findOne({ userId: req.body.id });
      
          if (!cart) {
            res.status(404).json("Cart not found");
            return;
          }
          if(cart.products.length === 0){
            res.status(400).json("Cart is already empty");
            return;
          }
      
        cart.products = [];
        await cart.save();
          res.status(200).json("Cart has been deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      };


exports.getCart = async (req, res) => {
    try {
        
        const cart = await Cart.findOne({
        userId: req.params.id,
        });

        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }
        const {products} = cart
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        let productsList = [];
        carts.map((cart) => {
            const {products} = cart;
            productsList.push(products);

        });
        res.json(productsList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.editProductQuantityInCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.id });
        if (!cart) {
            res.status(404).json("Cart not found");
            return;
        }

        const product = cart.products.find((product) => product.productId === req.body.productId);
        if (!product) {
            res.status(404).json("Product not found in cart");
            return;
        }
        if(req.body.quantity < 0){
            res.status(400).json("Quantity should be greater than 0");
            return
        }
        if (req.body.quantity === 0) {
            await cart.updateOne({ $pull: { products: { productId: req.body.productId } } });
            res.status(200).json("Product has been deleted from cart");
            return;
        }

        await cart.updateOne({ $set: { "products.$[elem].quantity": req.body.quantity } }, { arrayFilters: [{ "elem.productId": req.body.productId }] });
        res.status(200).json("Product quantity has been updated in cart");
    } catch (err) {
        res.status(500).json(err);
    }
}
