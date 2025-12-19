# Product-feedback

A full-stack product feedback application built with **React (client)** and **Node.js / Express (server)**.  
Users can submit feedback, comment, upvote ideas, and interact with product requests in a collaborative way.

---

## Features

- Create and manage product feedback
- Comment threads on feedback
- Authentication with demo users
- Automated cleanup for demo user data
- PostgreSQL database
- Docker & Docker Compose support

---

## Tech Stack

**Frontend**
- Vite
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express
- TypeScript
- PostgreSQL

**DevOps**
- Docker
- Docker Compose
- GitHub Actions
- dbmate (migrations)

**Authentication**
- JWT Webtokens

---

## Project Structure

```txt
Product-feedback/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── .github/workflows/      # CI workflows
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

## Getting Started

**Frontend**
```sh
cd client/
npm i
npm run dev
```
**Backend**

Create .env using .env.example 

```sh
cd server/
npm i
npm run dev
```
**Database**

Same .env as server

```sh
cd server/
docker compose up -d
```
---

