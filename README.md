# Social Media Platform

A production-inspired full-stack social media platform built from scratch to understand how modern applications are designed, developed, and scaled.

Unlike tutorial-based projects, this application is being developed without relying on third-party authentication providers such as Firebase or Auth0. The primary goal is to gain a deep understanding of authentication, authorization, backend architecture, database design, API development, frontend integration, and scalable software engineering practices.

This project serves as both a learning journey and a portfolio project demonstrating production-oriented development.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router
* Redux Toolkit
* RTK Query
* Tailwind CSS

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* JWT Authentication
* bcrypt
* Pino Logger

## Development Tools

* Git & GitHub
* Postman
* ESLint
* Prettier

---

# Project Structure

```text
social-media-platform
│
├── frontend
│
├── backend
│
└── README.md
```

---

# Backend Architecture

The backend follows a layered architecture with clear separation of responsibilities.

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

### Design Principles

* Layered Architecture
* Separation of Concerns
* Repository Pattern
* Service-Oriented Business Logic
* Secure Authentication
* Production-Oriented Development
* Clean Code Practices

---

# Authentication Flow

### Login

```text
Login
    ↓
Verify Credentials
    ↓
Generate Access Token
    ↓
Generate Refresh Token
    ↓
Hash Refresh Token
    ↓
Store Refresh Session
    ↓
Return Tokens
```

### Refresh Token Rotation

```text
Refresh Token
      ↓
Verify JWT
      ↓
Validate Session
      ↓
Delete Previous Session
      ↓
Generate New Access Token
      ↓
Generate New Refresh Token
      ↓
Store New Session
      ↓
Return New Tokens
```

---

# Features

## Authentication

* ✅ User Registration
* ✅ User Login
* ✅ Password Hashing (bcrypt)
* ✅ JWT Access Token Authentication
* ✅ JWT Refresh Token Authentication
* ✅ Protected Routes
* ✅ Current User Endpoint
* ✅ Refresh Token Session Management
* ✅ Refresh Token Rotation
* ✅ Logout Current Device
* ✅ Logout From All Devices
* ✅ Change Password
* ✅ Session Revocation After Password Change

## User

* ✅ User Profile APIs
* 🚧 Profile Management

---

# Current Status

## ✅ Completed

* Authentication Module
* JWT Authentication
* Refresh Token Rotation
* Session Management
* Password Management
* Production-Oriented Backend Architecture

## 🚧 Currently Working On

* Authorization

---

# Roadmap

## Authorization

* Role-Based Access Control (RBAC)
* Ownership-Based Authorization

## Social Features

* User Profiles
* Posts
* Comments
* Likes
* Follow System
* Feed Generation
* Search
* Notifications
* Reels
* Real-time Chat

## Media

* AWS S3 Image Upload
* Video Upload

## Infrastructure

* Redis Caching
* Background Jobs
* WebSockets
* Docker
* CI/CD
* Monitoring & Logging
* Deployment

---

# Learning Goals

This project focuses on mastering:

* Backend Architecture
* Authentication & Authorization
* REST API Design
* Database Design
* PostgreSQL
* TypeScript
* React
* Clean Code
* System Design
* Scalable Software Development
* AWS Services
* Production Engineering

---

# Vision

The goal of this project is not simply to recreate an existing social media application, but to understand how production-grade systems are built from the ground up.

The long-term objective is to evolve this platform beyond a traditional social media clone by introducing original features that solve real-world problems while showcasing scalable architecture, secure backend development, and modern engineering practices.

---

# License

MIT License
