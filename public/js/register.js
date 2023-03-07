const registerFormHandler = async (event) => {
    event.preventDefault();

    const first_name = document.querySelector('#first-name-register').value.trim();
    const last_name = document.querySelector('#last-name-register').value.trim();
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const address = document.querySelector('#address-register').value.trim();
    const phone_numbers = document.querySelector('#phone-numbers-register').value.trim();

    if (first_name && last_name && username && email && password && address && phone_numbers) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, username, email, password, address, phone_numbers }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.register-form')
    .addEventListener('submit', registerFormHandler);
