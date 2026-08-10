# 📚 Assignment & Submission Management System

A role-based school/college application for managing assignments and student submissions with teacher feedback.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ | pnpm/npm | Backend running

### Setup
```bash
# Install dependencies
pnpm install

# Create .env.local
echo "NEXT_PUBLIC_BASE_API=http://localhost:8000/api" > .env.local

# Run development server
pnpm dev
```
Visit `http://localhost:3000`

## 👥 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Teacher | teacher@example.com | teacher123 |
| Student | student@example.com | student123 |

## 🛠️ Tech Stack

**Frontend:** Next.js 16 | React 19 | TypeScript | Tailwind CSS 4 | Radix UI | Redux Toolkit

**Backend:** ASP.NET Core | C# | RESTful API | JWT Auth

**Database:** PostgreSQL / MongoDB

## 📂 Project Structure

```
app/                    # Routes
├── (home)/            # Landing page
├── (auth)/            # Login, Register, Password Reset
└── (dashboard)/       # Admin, Teacher, Student Dashboard
    ├── courses/       # Course Management
    ├── assignments/   # Assignment Management
    ├── subjects/      # Subject Management
    └── users/         # User Management

components/            # Reusable UI Components
├── ui/               # Radix UI Components
├── pages/            # Page Components
└── skeletons/        # Loading Skeletons (16 routes)

service/              # API Integration
redux/                # State Management
types/                # TypeScript Definitions
```

## ✨ Features

✅ Role-based access (Admin/Teacher/Student)  
✅ Assignment CRUD operations  
✅ Student submission tracking  
✅ Teacher grading & feedback  
✅ Course & subject management  
✅ User management  
✅ JWT authentication  
✅ Smooth loading states with skeletons  
✅ Responsive design  
✅ Dark mode support  

## 🔐 Security

- JWT-based authentication
- Role-based authorization
- Input validation with Zod
- CORS protection
- Secure password reset

## 📦 Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Start production
pnpm lint     # Run ESLint
```

## 📝 API Endpoints (Main)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | User login |
| GET | `/assignments` | List assignments |
| POST | `/assignments` | Create assignment |
| GET | `/courses` | List courses |
| GET | `/subjects` | List subjects |

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_BASE_API=http://localhost:8000/api
```

## 📋 Submission Checklist

- ✅ Git repository with complete source code
- ✅ Frontend & Backend included
- ✅ Database files/migrations included
- ✅ Demo credentials provided
- ✅ README with setup instructions
- ✅ All user roles implemented
- ✅ Role-based access enforced
- ✅ No secrets in repository

## 🚢 Production Deployment

```bash
pnpm build
pnpm start
```

Deploy to: Vercel, Railway, or traditional hosting

## 📞 Support

**Email:** hrd@onnorokom.com  
**GitHub:** [Repository Link]

---

**Project Type:** Full-stack web application  
**Deadline:** August 14, 2026  
**Version:** 0.1.0  
**Status:** Development
