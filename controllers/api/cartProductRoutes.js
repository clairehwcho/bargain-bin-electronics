const router = require('express').Router();
const { CartProduct } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all cartProducts of logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const cartProductData = await CartProduct.findAll({
            where: {
                user_id: req.session.user_id,
            }
        });
        const cartProducts = cartProductData.map((cartProduct) => cartProduct.get({ plain: true }));

        res.status(200).json(cartProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one cartProduct of logged-in user by product_id
router.get('/:product_id', withAuth, async (req, res) => {
    try {
        const cartProductData = await CartProduct.findOne({
            where: {
                product_id: req.params.product_id,
                user_id: req.session.user_id,
            }
        });

        if (!cartProductData) {
            res.status(404).json({ message: 'No cartProduct found with this id!' });
            return;
        }

        const cartProduct = cartProductData.get({ plain: true });

        res.status(200).json(cartProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new cartProduct
router.post('/', withAuth, async (req, res) => {
    try {
        const newCartProduct = await CartProduct.create({
            ...req.body,
            name: req.body.name,
            price: req.body.price,
            condition: req.body.condition,
            description: req.body.description,
            date_created: req.body.date_created,
            category: req.body.category,
            product_id: req.body.product_id,
            seller_username: req.body.seller_username,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCartProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a cartProduct
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const cartProductData = await CartProduct.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!cartProductData) {
            res.status(404).json({ message: 'No cartProduct found with this id!' });
            return;
        }

        res.status(200).json(cartProductData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
