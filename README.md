# social_media_app
# Social Media Platform

A production-inspired full-stack social media platform built to explore modern web application architecture, scalable backend design, and production-ready authentication.

This project is being developed from scratch without relying on authentication providers such as Firebase or Auth0. The goal is to understand how authentication, authorization, API design, database architecture, and frontend integration work internally.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt
- Pino Logger

### Tools

- Git & GitHub
- Postman
- ESLint
- Prettier

---

## Project Structure

```
social-media-platform
│
├── frontend
│
├── backend
│
└── README.md
```

---

## Features

### Authentication

- User Registration
- User Login
- JWT Access Token
- JWT Refresh Token
- Protected Routes
- Get Current User
- Change Password
- Refresh Access Token

### User

- User Profile
- Profile Management *(In Progress)*

### Future Roadmap

- Refresh Token Session Management
- Multi Device Login
- Logout From Single Device
- Logout From All Devices
- Forgot Password
- Reset Password
- Email Verification
- Posts
- Comments
- Likes
- Follow System
- Notifications
- Reels
- Image Upload (AWS S3)
- Real-time Chat
- Search
- Admin Dashboard

---

## Architecture

The backend follows a layered architecture.

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
PostgreSQL
```

Authentication uses JWT with middleware-based authorization.

---

## Current Status

🚧 Active Development

Authentication module is completed and the project is currently evolving towards production-grade session management and frontend integration.

---

## Learning Goals

This project is focused on understanding:

- Backend Architecture
- Authentication & Authorization
- Database Design
- REST API Design
- Clean Code
- TypeScript
- React
- System Design
- AWS Services
- Scalable Software Development

---

## License

MIT License