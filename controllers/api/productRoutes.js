const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

//get all Products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    const products = productData.map((product) => product.get({ plain: true }));

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new listing
router.post('/', withAuth, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      name: req.body.name,
      price: req.body.price,
      condition: req.body.condition,
      description: req.body.description,
      category: req.body.category,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a listing
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit a listing
router.put('/:id', withAuth, async (req, res) => {
  try {
  const productData = await Product.findByPk(req.params.id);
    const productUpdate = productData.update({
      ...req.body,
    });

    req.session.save(() => {
      res.status(200).json(productUpdate);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
