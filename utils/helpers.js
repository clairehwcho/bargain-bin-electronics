module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  return_cart_array: () => {
    return JSON.parse(req.localStorage.getItem(cartArray));
  },
  format_category: (category) => {
    return category.replace('&amp;', '&');
  },
  format_category_url: (url) => {
    return url.replace('%20', ' ').replace('&', '&amp;');
  }
};
