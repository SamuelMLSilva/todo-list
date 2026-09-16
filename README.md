# AUTH-JWT



Sistema de login e registro com autenticação via JWT, desenvolvido como projeto de portfólio.



## 🚀 Tecnologias



**Frontend:**



- React

- React Router

- Context API

- Vite



**Backend:**



- Node.js

- Express

- JWT (JSON Web Token)

- bcrypt



## 📋 Funcionalidades



- Registro de usuário

- Login com autenticação via JWT (cookie httpOnly)

- Persistência de sessão (mantém login após recarregar a página)

- Rotas protegidas (dashboard acessível apenas para usuários autenticados)

- Logout



## ⚙️ Como rodar o projeto localmente



### Backend

cd backend

npm install

cp .env.example .env



# Preencha as variáveis no .env


### Frontend

cd frontend

cp .env.example .env

npm install

VITE_API_URL=

### Backend

cd backend
cp .env.example .env

PORT=

DB_USER=

DB_PASSWORD=

DB_HOST=

DB_PORT=

DB_NAME=

JWT_SECRET=

JWT_EXPIRES_IN=

DATABASE_URL=

FRONTEND_URL=





