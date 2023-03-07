const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const wishlistProductRoutes = require('./wishlistProductRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/wishlistProducts', wishlistProductRoutes);

module.exports = router;
