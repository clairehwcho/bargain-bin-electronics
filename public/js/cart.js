const addToCart = async (event) => {
  const response = await fetch('/cart', {
    method: 'POST',
    body: JSON.stringify({product_id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log("item added to cart")
  }
  } else {
    alert(response.statusText);
  }

}

const viewCart = async (event) => {

    
}

document
  .querySelector('#addToCart')
  .addEventListener('click', addToCart);

document
  .querySelector('#viewCart')
  .addEventListener('click', viewCart);
