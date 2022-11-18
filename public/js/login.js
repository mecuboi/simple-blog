const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert("Please try again");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#user-first-name').value.trim();
  const last_name = document.querySelector('#user-last-name').value.trim();
  const email = document.querySelector('#user-email-address').value.trim();
  const password = document.querySelector('#user-password').value.trim();


  if (first_name && email && password && last_name) {


    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');


    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill in all of the fields")
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
