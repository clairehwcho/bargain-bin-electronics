const router = require('express').Router();
const { WishlistProduct } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all wishlistProducts of logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const wishlistProductData = await WishlistProduct.findAll({
            where: {
                user_id: req.session.user_id,
            }
        });
        const wishlistProducts = wishlistProductData.map((wishlistProduct) => wishlistProduct.get({ plain: true }));

        res.status(200).json(wishlistProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one wishlistProduct of logged-in user by product_id
router.get('/:product_id', withAuth, async (req, res) => {
    try {
        const wishlistProductData = await WishlistProduct.findOne({
            where: {
                product_id: req.params.product_id,
                user_id: req.session.user_id,
            }
        });

        if (!wishlistProductData) {
            res.status(404).json({ message: 'No cartProduct found with this id!' });
            return;
        }

        const wishlistProduct = wishlistProductData.get({ plain: true });

        res.status(200).json(wishlistProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new wishlistProduct
router.post('/', withAuth, async (req, res) => {
    try {
        const newWishlistProduct = await WishlistProduct.create({
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

        res.status(200).json(newWishlistProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a wishlistProduct
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const wishlistProductData = await WishlistProduct.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!wishlistProductData) {
            res.status(404).json({ message: 'No wishlistProduct found with this id!' });
            return;
        }

        res.status(200).json(wishlistProductData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
