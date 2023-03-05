const itemElems = document.getElementsByClassName('checkout-product-price').value;
const checkoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/cartProducts`, {
        method: 'GET'
    });
    if (response.ok) {
        document.location.replace('/cart/checkout');
    } else {
        alert(response.statusText);
    }
  

}

if (document.querySelectorAll('.checkout-button')) {
    document
        .querySelectorAll('.checkout-button')
        .forEach(button => button.addEventListener('click', checkoutHandler));
  };
