# MERN Todo App

A full-stack task manager built with the MERN stack (MongoDB, Express, React, Node.js). Create, edit, complete, and delete todos with a React frontend and a REST API backed by MongoDB.

## Features

- Add, edit, delete, and mark tasks as complete
- Persistent storage with MongoDB
- REST API with Express
- React + Vite frontend with Tailwind CSS
- Docker support for containerized deployment

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS, Axios |
| Backend  | Node.js, Express, Mongoose          |
| Database | MongoDB                             |
| DevOps   | Docker, Docker Compose, Nginx       |

## Project Structure

```
mern-todo-app-ieee-cs/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/todo.model.js  # Todo schema
│   ├── routes/todo.route.js  # API routes
│   ├── server.js             # Express entry point
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main UI component
│   │   └── utils/api.js      # Axios API client
│   ├── nginx.conf            # Reverse proxy for Docker
│   └── Dockerfile
└── docker-compose.yml
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (22 recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance
- [Docker](https://www.docker.com/) (optional, for containerized setup)

## Local Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd mern-todo-app-ieee-cs
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=<your-mongodb-connection-string>
```

Install dependencies and start the server:

```bash
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app opens at `http://localhost:3000`.

## Docker

Run the full stack with pre-built images:

```bash
docker compose up
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

Ensure `backend/.env` is configured before starting. The frontend container uses Nginx to proxy `/api` requests to the backend service.

To build and run from source instead:

```bash
docker compose build
docker compose up
```

## API Endpoints

Base URL: `/api/todos`

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/api/todos`    | List all todos           |
| POST   | `/api/todos`    | Create a todo            |
| PATCH  | `/api/todos/:id`| Update text or completed |
| DELETE | `/api/todos/:id`| Delete a todo            |

### Todo object

```json
{
  "_id": "...",
  "text": "Buy groceries",
  "completed": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Environment Variables

### Backend (`backend/.env`)

| Variable   | Description                          |
| ---------- | ------------------------------------ |
| `PORT`     | Server port (default: 5500)          |
| `NODE_ENV` | `development` or `production`        |
| `MONGO_URI`| MongoDB connection string            |
| `CLIENT_URL` | Allowed CORS origin (optional)     |

### Frontend (`frontend/.env`)

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| `VITE_API_URL` | Backend URL (e.g. `http://localhost:5000`)       |

Leave `VITE_API_URL` empty when the frontend is served behind Nginx with API proxying (Docker production setup).

## Scripts

### Backend

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start with nodemon       |
| `npm start`   | Start production server  |
| `npm run build` | Install deps and build frontend |

### Frontend

| Command         | Description        |
| --------------- | ------------------ |
| `npm run dev`   | Start Vite dev server |
| `npm run build` | Production build   |
| `npm run lint`  | Run ESLint         |

## License

ISC
