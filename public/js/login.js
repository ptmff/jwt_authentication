document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const resultDiv = document.getElementById('result');
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.token) {
        resultDiv.className = 'result success';
        resultDiv.innerText = 'Успешный вход! Перенаправление...';
        localStorage.setItem('token', data.token);
        
        // Add fade out animation
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('.container').style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        resultDiv.className = 'result error';
        resultDiv.innerText = data.message;
      }
    } catch (error) {
      resultDiv.className = 'result error';
      resultDiv.innerText = 'Ошибка входа. Попробуйте позже.';
    } finally {
      button.classList.remove('loading');
      button.disabled = false;
    }
  });