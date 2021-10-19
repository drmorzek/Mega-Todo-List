# Задача

Сделать todo, с crud на фронте и бэке

Фронт - vue, eslint, axios
Бэк - express, mysql, knex

Желательно, но необязательно обернуть в docker-compose

## Необходимые требования для запуска прилжения

- Docker(Docker-compose)
- Утилита make(не обязательно)

## Установка

1. Клонировать репозиторий
```bash
git clone https://github.com/drmorzek/Mega-Todo-List

```

2. Перейти в папку
```bash
cd Mega-Todo-List
```

3. Переименовать файл .env.example в .env
```bash
ren .env.example .env
```


4. Запустить скрипт

a) в режиме разработки 
```bash
docker-compose  -f docker-compose-dev.yml up

# или с использованием приложения make

make dev

```


б) сборка проекта
```bash
docker-compose  up

# или с использованием приложения make

make build

```


## Переменные окружения в .env

HTTP_PORT - порт на котором запуститься приложение

ADMINER_PORT - порт для веб-интерфеса визуального просмотра БД MySql

DB_ROOT_PASSWORD - пароль root пользователя БД MySql

DB_BASENAME=todolist - название базы данных в MySql

DB_USER - имя пользователя в MySql

DB_PASSWORD - пароль пользователя
