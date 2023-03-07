const Handlebars = require("handlebars");

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
  convert_category_number_to_name: (category) => {
    switch (category) {
      case "category1":
        return "TV &amp; Home Theater";
      case "category2":
        return "Computers &amp; Tablets";
      case "category3":
        return "Camera, Photo &amp; Video";
      case "category4":
        return "Cell Phones &amp; Accessories";
      case "category5":
        return "Headphones &amp; Audio";
      case "category6":
        return "Car Electronics";
      case "category7":
        return "Health &amp; Wellness";
      case "category8":
        return "Wearable Technology";
    }
  },
  convert_category_name_to_number: (category) => {
    switch (category) {
      case "TV &amp; Home Theater":
        return "category1";
      case "Computers &amp; Tablets":
        return "category2";
      case "Camera, Photo &amp; Video":
        return "category3";
      case "Cell Phones &amp; Accessories":
        return "category4";
      case "Headphones &amp; Audio":
        return "category5";
      case "Car Electronics":
        return "category6";
      case "Health &amp; Wellness":
        return "category7";
      case "Wearable Technology":
        return "category8";
    }
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
  },
  render_category_image: (category) => {
    switch (category) {
      case "TV &amp; Home Theater":
        return "tv.png";
      case "Computers &amp; Tablets":
        return "computers.png";
      case "Camera, Photo &amp; Video":
        return "cameras.png";
      case "Cell Phones &amp; Accessories":
        return "phones.png";
      case "Headphones &amp; Audio":
        return "headphones.png";
      case "Car Electronics":
        return "cars.png";
      case "Health &amp; Wellness":
        return "health.png";
      case "Wearable Technology":
        return "wearable.png";
    }
  },
  format_search_term: (search_term) => {
    return search_term.toLowerCase();
  },
  is_equal: (a, b) => {
    if (a == b) {
      return true;
    }
    else {
      return false;
    }
  }
};
