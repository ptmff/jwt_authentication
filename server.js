const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Замените на надёжное значение

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Хранение пользователей в памяти
let users = [];

// Middleware для проверки JWT токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Ожидается формат: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Недопустимый токен' });
    }
    req.user = user;
    next();
  });
}

// Маршрут регистрации
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Проверяем, существует ли уже пользователь с таким именем
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Пользователь уже существует' });
  }
  // Добавляем нового пользователя в массив
  users.push({ username, password });
  res.json({ message: 'Пользователь успешно зарегистрирован' });
});

// Маршрут входа
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверные учётные данные' });
  }
  // Генерируем JWT токен (срок действия 1 час)
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Защищённый маршрут, доступный только при валидном токене
app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'Доступ к защищённым данным получен',
    user: req.user
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Начните использование сервиса на странице http://localhost:3000/register.html`)
});
