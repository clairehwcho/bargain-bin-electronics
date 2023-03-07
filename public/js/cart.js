const addToCartButtonHandler = async (event) => {
    event.preventDefault();

    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');
    const condition = event.target.getAttribute('data-condition');
    const description = event.target.getAttribute('data-description');
    const date_created = event.target.getAttribute('data-date_created');
    const category = event.target.getAttribute('data-category');
    const product_id = event.target.getAttribute('data-product_id');
    const seller_username = event.target.getAttribute('data-seller_username');

    if (product_id) {
        const response = await fetch(`/api/cartProducts/${product_id}`, {
            method: 'GET'
        });

        if (response.ok) {
            alert("This product is already in your cart.");
            return;
        };
    };

    if (name && price && condition && description && date_created && category && product_id && seller_username) {
        const response = await fetch('/api/cartProducts', {
            method: 'POST',
            body: JSON.stringify({ name, price, condition, description, date_created, category, product_id, seller_username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert("This product is added to your cart.");
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const removeFromCartButtonHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    if (id) {
        const response = await fetch(`/api/cartProducts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelectorAll('.add-to-cart-button')) {
    document
        .querySelectorAll('.add-to-cart-button')
        .forEach(button => button.addEventListener('click', addToCartButtonHandler));
};

if (document.querySelectorAll('.remove-from-cart-button')) {
    document
        .querySelectorAll('.remove-from-cart-button')
        .forEach(button => button.addEventListener('click', removeFromCartButtonHandler));
};
