# 💪 STAY STRONG

**Stay Strong** is a comprehensive fullstack fitness & wellness platform for creating and managing personalized training programs. This project showcases modern web development practices through three distinct implementations: a monolithic Laravel MVC application, a RESTful API, and a React frontend that consumes the API.

## 📁 Project Structure

```
stay-strong/
├── fullstack-laravel/    # Laravel MVC app (Sprint 4 - monolithic)
├── backend-api/          # Laravel REST API (Sprint 5 - backend only)  
└── frontend-client/      # React client (Sprint 5 Vol II - frontend)
```

## 🎯 Project Overview

**Stay Strong** empowers users to plan, track, and achieve their fitness goals through personalized training programs. Users can create custom workout plans based on training frequency and duration, log weights for each exercise, and visualize their progress over time.

### ✨ Key Features

- 🏋️ **Custom Training Programs**: Create programs with personalized frequency (days/week) and duration
- 📊 **Progress Tracking**: Log weights lifted for each exercise and track improvements
- 📈 **Visual Analytics**: Real-time graphs showing weight progression over time
- 🔐 **Secure Authentication**: Role-based access control (Admin/Trainer/Trainee)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Session Management**: Track completed vs. remaining sessions

---

## 🔷 `fullstack-laravel/` - Monolithic MVC Application

A complete Laravel application following MVC architecture with integrated frontend and backend.

### **Technologies**
- **Backend**: Laravel 11 (PHP 8+)
- **Frontend**: Blade templates + Tailwind CSS + Livewire + JavaScript
- **Authentication**: Laravel Breeze
- **Database**: MySQL

### **Architecture & Features**

**Models**: User, Program, Exercise, SessionExercise, TrainingSession  
**Controllers**: Authentication, User, Program, TrainingSession  
**Services**: TrainingSessionService for business logic  
**Views**: Auth flows, dashboard, programs, sessions, exercises with progress tracking

### **Security & UX**
- Laravel Breeze authentication system
- Custom 404 error page with role-based redirects
- Livewire-powered dynamic progress graphs
- Clean service layer architecture

---

## 🟢 `backend-api/` - RESTful API

A standalone Laravel API designed to serve frontend clients with comprehensive authentication and authorization.

### **Technologies**
- **Backend**: Laravel 11 (PHP 8.2+)
- **Authentication**: Laravel Passport (OAuth 2.0)
- **Authorization**: Spatie Permission (role-based)
- **Documentation**: Swagger/OpenAPI
- **Testing**: PHPUnit

### **API Endpoints**

| Resource | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| **Auth** | POST | `/api/auth/register` | User registration |
| | POST | `/api/auth/login` | User login |
| | POST | `/api/auth/logout` | User logout |
| | GET | `/api/auth/me` | Get current user |
| **Users** | GET | `/api/users` | List users (Admin only) |
| | POST | `/api/users` | Create user (Admin only) |
| | GET/PATCH/DELETE | `/api/users/{user}` | User CRUD operations |
| **Programs** | GET/POST | `/api/programs` | List/Create programs |
| | GET/PATCH/DELETE | `/api/programs/{program}` | Program CRUD operations |
| **Sessions** | GET/PATCH | `/api/training-sessions/{session}` | Session management |
| | PATCH | `/api/training-sessions/{session}/exercises/{exercise}` | Exercise tracking |

### **User Roles & Permissions**

- **🏋️ Trainee**: Full control over own data, created via registration or by Admin
- **🧑‍🏫 Trainer**: Read-only access to other users' data, created by Admin only  
- **🧠 Admin**: Full system access, initial Admin created via database seeder

### **Documentation**
Interactive Swagger documentation available at `/api/documentation`

---

## 🟣 `frontend-client/` - React Application

A modern React frontend that consumes the Laravel REST API with comprehensive user management and training features.

### **Technologies**
- **Frontend**: React 19 + React Router 7.5.3
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API
- **State Management**: Context API
- **Authentication**: JWT tokens
- **Build Tool**: Vite
- **Notifications**: React-Toastify
- **Icons**: FontAwesome

### **Project Architecture**

```
src/
├── api/                    # Backend communication services
│   ├── authService.js      # Authentication & JWT management
│   ├── userService.js      # User CRUD operations
│   ├── programService.js   # Training program management
│   ├── sessionService.js   # Session tracking
│   └── exerciseService.js  # Exercise logging
├── components/             # React components
│   ├── auth/               # Login/Register forms
│   ├── dashboard/          # Main dashboard with statistics
│   ├── program/            # Program listing, creation, details
│   ├── session/            # Session management & exercise tracking
│   ├── user/               # User profile & admin user management
│   └── common/             # Navbar, Footer, 404 page
└── routes/                 # Protected routing & navigation
```

### **Implemented Features**

**Authentication System**
- JWT-based authentication with secure token management
- Role-based authorization and protected routes
- Reactive authentication state detection
- Improved logout flow with proper redirection

**Training Management**
- Create programs with minimum 2-month duration
- Paginated session listings (10 per page)
- Exercise completion tracking with weight logging
- Visual progress indicators and statistics

**User Experience**
- Responsive navigation with "STAY STRONG" branding
- Toast notifications for user feedback
- Loading states and confirmation dialogs
- Error handling with graceful recovery

---

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer 2.5+
- Node.js 18+
- MySQL 8.0+

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SimonMMB/stay-strong.git
   cd stay-strong
   ```

2. **Choose your implementation**
   
   **For MVC Laravel (fullstack-laravel/):**
   ```bash
   cd fullstack-laravel
   composer install
   npm install
   cp .env.example .env
   php artisan key:generate
   # Configure database in .env
   php artisan migrate --seed
   npm run dev
   php artisan serve
   ```

   **For API + React (backend-api/ + frontend-client/):**
   
   *Backend setup:*
   ```bash
   cd backend-api
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan passport:install
   # Configure database in .env
   php artisan migrate --seed
   php artisan serve
   ```
   
   *Frontend setup:*
   ```bash
   cd frontend-client
   npm install
   echo "VITE_API_URL=http://localhost:8000/api" > .env.local
   npm run dev
   ```

3. **Access the application**
   - **MVC Version**: http://localhost:8000
   - **React Version**: http://localhost:5173
   - **API Documentation**: http://localhost:8000/api/documentation

### Default Credentials
- **Admin**: arizona@alabama.com / qwerty123
- Or register as a new trainee user

---

## 🔄 Development Journey

This project was developed through multiple sprints, showcasing different architectural approaches:

1. **Sprint 4**: Monolithic MVC application with Blade templates and Livewire
2. **Sprint 5**: RESTful API with Passport authentication and role-based permissions  
3. **Sprint 5 Vol II**: React frontend consuming the API with modern JavaScript patterns

Each implementation demonstrates different aspects of modern web development, from traditional server-side rendering to API-first architecture with separate frontend applications.

---

## 🛠 Technologies Summary

| Component | Laravel MVC | REST API | React Client |
|-----------|-------------|----------|--------------|
| **Backend** | Laravel 11 + Blade | Laravel 11 API | - |
| **Frontend** | Blade + Livewire + Tailwind | - | React 19 + Tailwind |
| **Auth** | Breeze | Passport (OAuth 2.0) | JWT tokens |
| **Database** | MySQL | MySQL | API consumption |
| **Testing** | PHPUnit | PHPUnit + Swagger | - |
| **Features** | Monolithic fullstack | API + Documentation | SPA + API integration |

---

## 📩 Contact

Feel free to reach out if you want to connect, collaborate, or learn more about this project:

- **📧 Email**: [menendezsimon@gmail.com](mailto:menendezsimon@gmail.com)
- **💼 LinkedIn**: [linkedin.com/in/simon-menendez-bravo](https://linkedin.com/in/simon-menendez-bravo/)
- **🔗 GitHub**: [github.com/SimonMMB](https://github.com/SimonMMB)

---

*Built with ❤️ during my journey as a fullstack developer - showcasing Laravel MVC, REST API design, and modern React development*