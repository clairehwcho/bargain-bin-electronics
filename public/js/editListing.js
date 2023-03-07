const editListingFormHandler = async (event) => {
    event.preventDefault();


    const id = document.querySelector('.edit-product-button').getAttribute('data-id');
    const category = document.querySelector('#category-edit').value.trim();
    const name = document.querySelector('#name-edit').value.trim();
    const price = document.querySelector('#price-edit').value.trim();
    const condition = document.querySelector('#condition-edit').value.trim();
    const description = document.querySelector('#description-edit').value.trim();

    if (id && category && name && price && condition && description) {
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ category, name, price, condition, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/marketplace');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.create-listing-form')
    .addEventListener('submit', editListingFormHandler);
