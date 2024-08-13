const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

// Add item to cart
const addtoCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        const quantityNumber = parseInt(quantity, 10);
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantityNumber;
        } else {
            cart.items.push({ productId, quantity: quantityNumber });
        }

        await cart.save();
        res.redirect('/cart/cartView');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: error.message });
    }
};

const viewCardControll = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.render('cart', { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const orderCardController = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate the total amount
        const totalAmount = cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);

        // Create a new order with correct field names
        const order = new Order({
            userId,
            total: totalAmount,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            }))
        });

        await order.save();
        cart.items = [];
        await cart.save();
        const populatedOrder = await Order.findById(order._id).populate('items.productId');
        res.render('confirmOrder', { order: populatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const orderHistoryController = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).populate('items.productId');

        if (!orders || orders.length === 0) {
            return res.render('orderHistory', { orders: [], message: 'No orders found.' });
        }

        res.render('orderHistory', { orders });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addtoCartController, viewCardControll, orderCardController,orderHistoryController};
