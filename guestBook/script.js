document.addEventListener('DOMContentLoaded', function() {
  
  document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();
      const form = new FormData(this);

      fetch('/submit-form', { // Update the route to "/submit-form"
          method: 'POST',
          body: form
      })
      .then(response => response.text())
      .then(data => {
          document.getElementById('users-information').innerHTML = data;
      });
  });
});


