document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('result');
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      resultDiv.innerText = data.message;
      if (response.ok) {
        // После успешной регистрации можно редиректить на страницу входа
        setTimeout(() => window.location.href = 'login.html', 1500);
      }
    } catch (error) {
      resultDiv.innerText = 'Ошибка регистрации';
    }
  });
  