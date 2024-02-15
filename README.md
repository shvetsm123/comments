# Comments App (Backend)

Simple comment app with next features you can do:

- Sign in / Log in

- Display a list of all comments

- Add a new comment to the list

- Add a reply for a comment

- Add a reply for reply

---

Stack: Nest.js, PostgreSQL, Sequelize, WebSocket, Docker.

# How to run project

Clone directory

```bash
  git clone https://github.com/shvetsm123/comments
```

Open it

```bash
  cd comments
```

Install all packages

```bash
  cd server
  npm install
```

OR

Run Docker file (POSTGRES_HOST=postgres)

```bash
    docker compose --file ./docker-compose-dev.yml up --build
```

Connect your Postgres (POSTGRES_HOST=localhost)

```bash
  cd server/.env
```

Run it locally on 5000 port

```bash
  http://localhost:5000/
```

---

# Functionality test via Postman/Insomnia

1. Registration

```bash
  POST http://localhost:5000/auth/registration
```

required:
{
"email": "test@test.com",
"password": "test123",
"userName": "test123"
}

2. Login

```bash
  POST http://localhost:5000/auth/login
```

required:
{
"email": "test@test.com",
"password": "test123",
}

3. Get all comments

```bash
  GET http://localhost:5000/comments
```

optional query params: ?page=1&limit=25

4. Create comment (only for authorized, header Authorization: Bearer yourtoken)

```bash
  POST http://localhost:5000/comments
```

{
"text": "test",
"userId": 1,
"captcha": "test",
}

5. Create reply (only for authorized, header Authorization: Bearer yourtoken, also add "parentCommentId")

```bash
  POST http://localhost:5000/comments
```

{
"text": "test",
"userId": 1,
"captcha": "test",
"parentCommentId": 2
}
