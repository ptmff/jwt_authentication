// Check for token and redirect if not found
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

document.getElementById('get-data').addEventListener('click', async () => {
  const button = document.getElementById('get-data');
  const resultDiv = document.getElementById('result');
  
  // Add loading state
  button.classList.add('loading');
  button.disabled = true;
  
  try {
    const response = await fetch('/protected', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const data = await response.json();
    
    // Show result div and add visible class
    resultDiv.classList.add('visible');
    
    if (response.ok) {
      resultDiv.className = 'result visible success';
      resultDiv.innerText = JSON.stringify(data, null, 2);
    } else {
      resultDiv.className = 'result visible error';
      resultDiv.innerText = data.message;
    }
  } catch (error) {
    resultDiv.classList.add('visible');
    resultDiv.className = 'result visible error';
    resultDiv.innerText = 'Ошибка получения данных';
  } finally {
    button.classList.remove('loading');
    button.disabled = false;
  }
});

// Handle logout with animation
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  
  // Add fade out animation
  document.querySelector('.container').style.opacity = '0';
  document.querySelector('.container').style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }, 300);
});