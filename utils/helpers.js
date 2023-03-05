module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  format_category: (category) => {
    return category.replace('&amp;', '&');
  },
  format_category_url: (url) => {
    return url.replace('%20', ' ').replace('&', '&amp;');
  },
  sumArray: (array) => {
    let result = array.reduce((a, b) => {
      return a + b;
    }, 10);
    return result;
  }
};
