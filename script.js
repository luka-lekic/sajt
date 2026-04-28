// Contact form validation and simple interactivity
(function () {
  'use strict';

  var form = document.querySelector('form.contact-form');
  if (!form) return;

  var nameField = form.querySelector('#name');
  var emailField = form.querySelector('#email');
  var messageField = form.querySelector('#message');
  var status = form.querySelector('.form-status');

  function setError(field, msg) {
    var errorEl = field.parentElement.querySelector('.error');
    if (errorEl) errorEl.textContent = msg || '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    var ok = true;

    if (!nameField.value.trim()) {
      setError(nameField, 'Please enter your name.');
      ok = false;
    } else if (nameField.value.trim().length < 2) {
      setError(nameField, 'Name must be at least 2 characters.');
      ok = false;
    } else {
      setError(nameField, '');
    }

    if (!emailField.value.trim()) {
      setError(emailField, 'Please enter your email.');
      ok = false;
    } else if (!isValidEmail(emailField.value.trim())) {
      setError(emailField, 'Please enter a valid email address.');
      ok = false;
    } else {
      setError(emailField, '');
    }

    if (!messageField.value.trim()) {
      setError(messageField, 'Please enter a message.');
      ok = false;
    } else if (messageField.value.trim().length < 10) {
      setError(messageField, 'Message should be at least 10 characters.');
      ok = false;
    } else {
      setError(messageField, '');
    }

    return ok;
  }

  [nameField, emailField, messageField].forEach(function (f) {
    f.addEventListener('input', function () {
      setError(f, '');
      if (status) {
        status.textContent = '';
        status.className = 'form-status';
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) {
      if (status) {
        status.textContent = 'Please fix the errors above.';
        status.className = 'form-status error';
      }
      return;
    }

    if (status) {
      status.textContent = 'Thanks! Your message has been validated and is ready to send.';
      status.className = 'form-status success';
    }
    form.reset();
  });
})();
