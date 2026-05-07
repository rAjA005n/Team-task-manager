# Team Task Manager

A full-stack MERN application for managing teams, projects, and tasks with role-based access control.

## Features

### Authentication
- User signup and login
- JWT authentication
- Protected routes
- Logout functionality

### Role-Based Access Control

#### Admin
- Create projects
- Create teams
- Create tasks
- Delete projects and tasks
- Manage team members

#### Member
- View projects and teams
- Update assigned task status
- Track project progress

### Project Management
- Create and manage projects
- Track project status
- Progress indicators
- Project creator and created date

### Team Management
- Create teams
- Add descriptions
- Add members
- View total team members

### Task Management
- Create tasks
- Task priorities
- Status tracking
- Overdue task detection
- Search tasks
- Delete tasks

### Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- In-progress tasks
- Overdue tasks
- Total projects
- Total teams

---

# Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

# Folder Structure

```txt
team-task-manager/
│
├── backend/
├── frontend/
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/team-task-manager.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5002
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Routes

## Authentication
- POST `/api/auth/signup`
- POST `/api/auth/login`

## Projects
- GET `/api/projects`
- POST `/api/projects`
- DELETE `/api/projects/:id`

## Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Teams
- GET `/api/teams`
- POST `/api/teams`

---

# Role Access

| Feature | Admin | Member |
|---|---|---|
| Create Project | Yes | No |
| Delete Project | Yes | No |
| Create Task | Yes | No |
| Delete Task | Yes | No |
| Update Task Status | Yes | Yes |
| View Dashboard | Yes | Yes |

---

# MongoDB Relationships

```txt
User
 └── Team

Team
 └── Projects

Project
 └── Tasks

Task
 └── Assigned User
```

---

# Security Features

- JWT authentication
- Password hashing
- Protected APIs
- Role middleware
- Input validation
- MongoDB schema validation

---

# Deployment

Railway




# Future Improvements

- Kanban board
- Notifications
- Charts and analytics
- File uploads
- Team chat
- Email notifications




