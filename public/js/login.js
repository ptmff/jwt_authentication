document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('result');
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.token) {
        // Сохраним токен в localStorage и перенаправим пользователя
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      } else {
        resultDiv.innerText = data.message;
      }
    } catch (error) {
      resultDiv.innerText = 'Ошибка входа';
    }
  });
  