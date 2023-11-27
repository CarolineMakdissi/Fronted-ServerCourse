
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = new FormData(this);

    fetch('/', {
      method: 'POST',
      body: form
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('users-information').innerHTML = data; });
    });