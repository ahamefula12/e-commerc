document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  if (menuToggle && menuOverlay && menuClose) {
    menuToggle.addEventListener('click', () => menuOverlay.classList.add('active'));
    menuClose.addEventListener('click', () => menuOverlay.classList.remove('active'));
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) menuOverlay.classList.remove('active');
    });
  }

  const loginBox = document.getElementById('loginBox');
  const signupBox = document.getElementById('signupBox');
  window.showSignup = function () {
    if (loginBox && signupBox) {
      loginBox.style.display = 'none';
      signupBox.style.display = 'block';
    }
  };
  window.showLogin = function () {
    if (loginBox && signupBox) {
      signupBox.style.display = 'none';
      loginBox.style.display = 'block';
    }
  };

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = loginForm.querySelectorAll('input');
      const email = inputs[0]?.value?.trim() || '';
      const name = email.split('@')[0] || 'User';
      const user = { name, email };
      try { localStorage.setItem('loggedInUser', JSON.stringify(user)); } catch (_) {}
      window.location.href = 'index.html';
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = signupForm.querySelectorAll('input');
      const name = inputs[0]?.value?.trim() || 'User';
      const email = inputs[1]?.value?.trim() || '';
      const user = { name, email };
      try { localStorage.setItem('loggedInUser', JSON.stringify(user)); } catch (_) {}
      window.location.href = 'index.html';
    });
  }
});
