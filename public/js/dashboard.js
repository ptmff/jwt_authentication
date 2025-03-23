// Если токена нет, перенаправляем на страницу входа
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

document.getElementById('get-data').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  try {
    const response = await fetch('/protected', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();
    resultDiv.innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    resultDiv.innerText = 'Ошибка получения данных';
  }
});

// Обработка выхода: удаляем токен и перенаправляем на страницу входа
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});
