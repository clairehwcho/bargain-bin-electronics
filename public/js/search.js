const searchFormHandler = async (event) => {
    event.preventDefault();

    const search_term = document.querySelector('#search-input').value.trim();

    if (search_term) {
        document.location.replace(`/marketplace/search/${search_term}`);
    }
};

document
    .querySelector('.search-button')
    .addEventListener('click', searchFormHandler);
