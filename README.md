# 🌟 Mwangaza: A Learning Management System (LMS)
*"Lighting the path to a better life, one skill at a time."*

---

## 📖 Project Overview

**Mwangaza** is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application designed to empower underserved adults by offering practical, gamified learning experiences in communication, math, wellness, and life skills. It provides tailored access for learners, counselors, and admins to engage with structured learning content and guidance.

---

## 🧱 Project Structure

mwangaza/
├── client/ # React frontend application
│ ├── public/
│ ├── src/
│ │ ├── assets/ # Images, icons, etc.
│ │ ├── components/ # Reusable UI components (e.g., Button, Modal)
│ │ ├── contexts/ # React Context for state management
│ │ ├── hooks/ # Custom React hooks
│ │ ├── pages/ # Top-level components for different routes
│ │ ├── utils/ # Utility functions
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
├── server/ # Node.js/Express.js backend API
│ ├── config/ # Database connection, environment variables
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Express middleware (auth, error handling)
│ ├── models/ # Mongoose schemas and models
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions (e.g., JWT helpers)
│ ├── server.js
│ └── ...
├── .env # Environment variables
├── .gitignore
├── package.json
├── README.md
└── todo.md


---

## ⚙️ Core Components and Interactions

### 🎨 Frontend (React.js)
- **Authentication**: Login, Register, Logout, and protected routes.
- **Navigation**: Sidebar and navbar tailored by role (Learner, Counselor, Admin).
- **Learning Modules**:
    - `CourseViewer`, `LessonCard`, `QuizCard` to display and interact with content.
- **Gamification**: Progress bars, XP system, and badge displays.
- **Counseling System**: `MessageBoard` for communication between learners and counselors.
- **Admin Panel**: Course and user management tools.
- **Styling**: Tailwind CSS and DaisyUI for elegant, responsive UI.
- **State Management**: React Context or Zustand.
- **API Integration**: Axios used for backend communication.

### 🧠 Backend (Node.js/Express.js)
- **Authentication**: Secure JWT-based user authentication.
- **User Management**: Register, login, roles (Learner, Counselor, Admin).
- **Course & Lesson Management**: Full CRUD for courses, modules, and lessons.
- **Quiz Management**: Handle quiz creation and scoring.
- **Progress Tracking**: Track learner performance, XP, and streaks.
- **Counseling System**: Manage messages between learners and counselors.
- **Database**: MongoDB via Mongoose.
- **Middleware**: Authentication, error handling, role-based access control.
- **Real-time Features (optional)**: Chat using Socket.io.

---

## 🧩 MongoDB Models

- **User Model**: Stores name, email, password, role, XP, and progress.
- **Course Model**: Title, category, description, list of modules.
- **Module Model**: Belongs to course, contains lessons.
- **Lesson Model**: Text, images, audio, video, and mini-quizzes.
- **Quiz Model**: Questions, multiple-choice answers, correct key.
- **Progress Model**: Tracks completed lessons, quiz scores.
- **Message Model**: Stores counseling messages.

---

## 🔌 RESTful API Endpoints

- `POST /api/auth`: Register and login users
- `GET /api/courses`: List all courses
- `POST /api/courses`: Admin creates new course
- `POST /api/modules`: Add module to course
- `POST /api/lessons`: Add lesson to module
- `GET /api/lessons/:id`: Get lesson content
- `POST /api/progress`: Update learner progress
- `GET /api/progress/:userId`: View learner progress
- `POST /api/quizzes`: Create and validate quizzes
- `POST /api/messages`: Send counseling messages
- `GET /api/messages/:userId`: View user messages

---

## 🚀 Deployment

- **Frontend**: [Vercel](https://vercel.com/lone-rangers-projects/v0-mwangaza-educational-platform)
- **Backend**: [Render](https://render.com)

---

## 🔗 Repository

📁 GitHub: [https://github.com/jj-tech-ranger/mwangaza_project](https://github.com/jj-tech-ranger/mwangaza_project)

---

## 🧪 Work in Progress

This project is under active development. More features, polish, and documentation updates coming soon.

---

## 📜 License

MIT License

---
---

## 📊 Pitch Deck

📎 [Click here to view the Mwangaza Pitch Deck](./docs/MWANGAZA_PITCH_DECK.pptx)

This presentation outlines the vision, problem, solution, and implementation plan for the Mwangaza Learning Management System.
