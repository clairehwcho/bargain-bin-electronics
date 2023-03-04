const User = require('./User');
const Product = require('./Product');
const WishlistProduct = require('./WishlistProduct');
const CartProduct = require('./CartProduct');

// One user has many products
User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// One product belongs to one user
Product.belongsTo(User, {
  foreignKey: 'user_id'
});

// One user has many wishlistProducts
User.hasMany(WishlistProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// One wishlistProduct belongs to one user
WishlistProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

// One user has many cartProducts
User.hasMany(CartProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// One cartProduct belongs to one user
CartProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Product, WishlistProduct, CartProduct};
