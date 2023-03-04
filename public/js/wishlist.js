const addToWishlistButtonHandler = async (event) => {
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
        const response = await fetch(`/api/wishlistProducts/${product_id}`, {
            method: 'GET'
        });

        if (response.ok) {
            alert("This product is already in your wishlist.");
            return;
        };
    };

    if (name && price && condition && description && date_created && category && product_id && seller_username) {
        const response = await fetch('/api/wishlistProducts', {
            method: 'POST',
            body: JSON.stringify({ name, price, condition, description, date_created, category, product_id, seller_username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert("This product is added to your wishlist.");
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const removeFromWishlistButtonHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    if (id) {
        const response = await fetch(`api/wishlistProducts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelectorAll('.add-to-wishlist-button')) {
    document
        .querySelectorAll('.add-to-wishlist-button')
        .forEach(button => button.addEventListener('click', addToWishlistButtonHandler));
};

if (document.querySelectorAll('.remove-from-wishlist-button')) {
    document
        .querySelectorAll('.remove-from-wishlist-button')
        .forEach(button => button.addEventListener('click', removeFromWishlistButtonHandler));
};