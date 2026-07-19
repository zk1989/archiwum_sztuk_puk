// Simple access gate — deters casual visitors only, not real security.
(function () {
  var PASSWORD = 'filip';
  var STORAGE_KEY = 'sztukpuk_unlocked';

  if (localStorage.getItem(STORAGE_KEY) === 'yes') {
    document.body.classList.add('unlocked');
    return;
  }

  var form = document.getElementById('gate-form');
  var input = document.getElementById('gate-input');
  var error = document.getElementById('gate-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'yes');
      document.body.classList.add('unlocked');
    } else {
      error.classList.add('show');
      input.value = '';
      input.focus();
    }
  });
})();
