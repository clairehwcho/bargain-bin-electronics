
var itemElems = $('.checkout-product-price').map(function () {
    return this.dataset.price;
}).get();

function getTotal (arr) {
    let sum = 0;
    arr.forEach(function (num) { sum += parseFloat(num) || 0; });
    return sum;
}
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

document.onload = $("#checkout_total").text(getTotal(itemElems));