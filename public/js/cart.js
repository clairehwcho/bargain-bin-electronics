const addToCart = async (event) => {
  let product_id = event.target.dataset.product_id;
  console.log(product_id);


	if (localStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(localStorage.getItem('shopping-cart'));
	}
  else{  var cartArray = new Array();}
  cartArray.push(product_id);
  
  console.log(cartArray);
  var cartJSON = JSON.stringify(cartArray);
	localStorage.setItem('cartArray', cartJSON);
}

const viewCart = async () => {
	if (localStorage.getItem('cartArray')) {

  const response = await fetch('/cart', {
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/cart');
  }
   else {
    alert(response.statusText);
  }
}
}

var addToCartElem = document.querySelectorAll('.addToCart');

for (let i = 0; i < addToCartElem.length; i++) {
  const element = addToCartElem[i];
  element.addEventListener('click', addToCart);
}

// document
//   .getElementById('viewCart')
//   .addEventListener('click', viewCart);
