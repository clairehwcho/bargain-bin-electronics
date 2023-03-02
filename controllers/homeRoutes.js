const router = require('express').Router();
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');
const { return_cart_array } = require('../utils/helpers');

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

// Render cart page
router.get('/cart', withAuth, async (req, res) => {
  const cart = JSON.parse(return_cart_array);
  console.log(cart);
  if (cart) {
    try {
      const cartData = await Product.findAll({
        where: {
          id: cart,
        }
      });
      const cart_items = cartData.map((product) => product.get({ plain: true }));

      res.render('cart', {
        ...cart_items,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// router.post('/cart', withAuth, async (req, res) => {
//   try {
//     const productData = await Product.findByPk(req.body.product_id, {
//       include: [{ model: User }],
//     });
//     if(productData){
//     var cart = req.session.cart || [];
//     cart.push(req.body.itemId);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Render wishlist page
router.get('/wishlist', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('wishlist', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all products for marketplace page
router.get('/marketplace', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const productData = await Product.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    const user = userData.get({ plain: true });
    const products = productData.map((product) => product.get({ plain: true }));

    res.render('marketplace', {
      ...user,
      products,
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

// Get one product
router.get('/marketplace/product/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
      ],
    });

    const user = userData.get({ plain: true });
    const product = productData.get({ plain: true });
    console.log(product);

    res.render('product-details', {
      ...user,
      product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render contact us page
router.get('/contactus', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));

    res.render('contact-us', {
      products,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Render register page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('register');
});


module.exports = router;
