const addToCart = async (event) => {
  const response = await fetch('/cart', {
    method: 'POST',
    body: JSON.stringify({product_id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log("item added to cart");
  }
   else {
    alert(response.statusText);
  }

}

const viewCart = async (event) => {
  const product_id = event.target.getAttribute(data-product_id);
  const response = await fetch('/cart', {
    method: 'GET',
    body: JSON.stringify({product_id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/cart');
  }
   else {
    alert(response.statusText);
  }
    
}

document
  .getElementById('addToCart')
  .addEventListener('click', addToCart);

document
  .getElementById('viewCart')
  .addEventListener('click', viewCart);
