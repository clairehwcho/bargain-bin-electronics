const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const wishlistProductRoutes = require('./wishlistProductRoutes');
const cartProductRoutes = require('./cartProductRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/wishlistProducts', wishlistProductRoutes);
router.use('/cartProducts', cartProductRoutes);

module.exports = router;
