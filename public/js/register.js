document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const resultDiv = document.getElementById('result');
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      // Show result div
      resultDiv.classList.add('visible');
      
      if (response.ok) {
        resultDiv.className = 'result visible success';
        resultDiv.innerText = 'Регистрация успешна! Перенаправление...';
        
        // Add fade out animation
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('.container').style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        resultDiv.className = 'result visible error';
        resultDiv.innerText = data.message;
      }
    } catch (error) {
      resultDiv.classList.add('visible');
      resultDiv.className = 'result visible error';
      resultDiv.innerText = 'Ошибка регистрации. Попробуйте позже.';
    } finally {
      button.classList.remove('loading');
      button.disabled = false;
    }
  });