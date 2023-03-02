const router = require('express').Router();
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');
const { return_cart_array } = require('../utils/helpers');


router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));

    res.render('homepage', {
      products,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render('product-details', {
      ...product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.get('/cart', withAuth, async (req, res) => {
  const cart = JSON.parse(return_cart_array);
console.log(cart);
  if(cart){
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

router.get('/marketplace', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('marketplace', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/marketplace/new', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('create-listing', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('register');
});


module.exports = router;
