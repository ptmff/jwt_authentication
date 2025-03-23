FROM node:22

# Задаём рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт 3000 для доступа к приложению
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]
