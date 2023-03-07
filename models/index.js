const User = require('./User');
const Product = require('./Product');
const WishlistProduct = require('./WishlistProduct');
const CartProduct = require('./CartProduct');

User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Product.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(WishlistProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

WishlistProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(CartProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

CartProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Product, WishlistProduct, CartProduct};
