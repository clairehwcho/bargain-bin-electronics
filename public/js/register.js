const registerFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name-register').value.trim();
    const lastName = document.querySelector('#last-name-register').value.trim();
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const address = document.querySelector('#address-register').value.trim();
    const phoneNumbers = document.querySelector('#phone-numbers-register').value.trim();

    if (firstName && lastName && username && email && password && address && phoneNumbers) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, username, email, password, address, phoneNumbers }),
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
