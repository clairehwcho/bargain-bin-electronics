const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoutes = require('./cartRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
