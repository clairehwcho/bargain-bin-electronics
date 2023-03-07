const editProductButtonHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    if (id) {
        document.location.replace(`/marketplace/product/edit/${id}`)
    };
};

const deleteProductButtonHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    if (id) {
        if (confirm("Do you want to delete this listing?")) {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/marketplace');
            } else {
                alert(response.statusText);
            }
        }
    }
};

if (document.querySelector('.edit-product-button')) {
    document
        .querySelector('.edit-product-button')
        .addEventListener('click', editProductButtonHandler);
};

if (document.querySelector('.delete-product-button')) {
    document
        .querySelector('.delete-product-button')
        .addEventListener('click', deleteProductButtonHandler);
};

