const router = require('express').Router();
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');
const { return_cart_array } = require('../utils/helpers');

router.get('/cart', withAuth, async (req, res) => {
    const cart = return_cart_array;
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
  

  module.exports = router;