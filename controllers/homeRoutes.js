const router = require('express').Router();
const { Product, User, WishlistProduct, CartProduct } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize");
const { format_category_url } = require('../utils/helpers');

// Render homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render order history page
router.get('/profile/order-history', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('order-history', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render wishlist page
router.get('/wishlist', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const wishlistProductData = await WishlistProduct.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User
        },
      ],
    });

    const wishlistProducts = wishlistProductData.map((wishlistProduct) => wishlistProduct.get({ plain: true }));

    res.render('wishlist', {
      ...user,
      wishlistProducts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render cart page
router.get('/cart', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const cartProductData = await CartProduct.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User
        },
      ],
    });

    const cartProducts = cartProductData.map((cartProduct) => cartProduct.get({ plain: true }));

    res.render('cart', {
      ...user,
      cartProducts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Render marketplace page
router.get('/marketplace', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Product },
        { model: WishlistProduct }
      ],
    });

    const user = userData.get({ plain: true });

    const productData = await Product.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    const allCategoryProducts = productData.map((product) => product.get({ plain: true }));

    res.render('marketplace', {
      ...user,
      allCategoryProducts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render create a new listing page
router.get('/marketplace/product/new', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('create-listing', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render product details page
router.get('/marketplace/product/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render('product-details', {
      ...user,
      product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all products whose name or category include search term
router.get('/marketplace/search/:search_term', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const productData = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.params.search_term}%`
            }
          },
          {
            description: {
              [Op.like]: `%${req.params.search_term}%`
            }
          }
        ]
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });


    if (productData) {
      const searchedProducts = productData.map((product) => product.get({ plain: true }));
      res.render('marketplace', {
        ...user,
        searchedProducts,
        logged_in: req.session.logged_in
      });
    } else {
      res.render('marketplace', {
        ...user,
        logged_in: req.session.logged_in
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all products of each category
router.get('/marketplace/:category', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const category_name = req.params.category;

    const productData = await Product.findAll({
      where: { category: format_category_url(category_name) },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });

    const oneCategoryProducts = productData.map((product) => product.get({ plain: true }));

    res.render('marketplace', {
      ...user,
      oneCategoryProducts,
      category_name,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render contact us page
router.get('/contact-us', async (req, res) => {
  try {
    res.render('contact-us', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/marketplace');
    return;
  }

  res.render('login');
});

// Render register page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/marketplace');
    return;
  }

  res.render('register');
});

//Render checkout page
router.get('/cart/checkout', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    const cartProductData = await CartProduct.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User
        },
      ],
    });

    const cartProducts = cartProductData.map((cartProduct) => cartProduct.get({ plain: true }));

    res.render('checkout', {
      ...user,
      cartProducts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
