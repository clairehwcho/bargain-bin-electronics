const createListingFormHandler = async (event) => {
    event.preventDefault();

    const category = document.querySelector('#category-create').value.trim();
    const price = document.querySelector('#price-create').value.trim();
    const condition = document.querySelector('#condition-create').value.trim();
    const description = document.querySelector('#description-create').value.trim();

    if (category && price && condition && description) {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({ category, price, condition, description }),
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
    .addEventListener('submit', createListingFormHandler);
