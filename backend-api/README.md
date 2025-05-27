<a id="readme-top"></a>

<h1 align="center">STAY STRONG</h1>
<p align="center">RESTful API for training program management</p>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>  
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#authentication-and-usage">Authentication and Usage</a></li>
    <li><a href="#documentation">Documentation</a></li>
  </ol>
</details>

## About The Project

RESTful API for creating and managing personalized training programs, including exercise tracking and session handling.

✨ Key Features<br>
✅ JWT Authentication<br>
✅ Role-based permissions (Admin / Trainer / Trainee)<br> 
✅ CRUD operations for programs and sessions<br>
✅ Progress tracking with weight logging<br>
✅ Swagger documentation

<p align="left">(<a href="#readme-top">back to top</a>)</p>

## Built With<br>
⚙️ **Backend**: Laravel 12<br>
🔑 **Authentication**: Passport<br>
🖥️ **API Standards**: RESTful principles<br>
🗄️ **Database**: MySQL<br>
📝 **Documentation**: Swagger (OpenAPI)<br>
🧪 **Testing**: PHPUnit

<p align="left">(<a href="#readme-top">back to top</a>)</p>

## API Endpoints

| Resource          | Method | Endpoint                     | Description                     |
|-------------------|--------|------------------------------|---------------------------------|
| **Authentication**| POST   | `/api/auth/register`         | User registration               |
|                   | POST   | `/api/auth/login`            | User login                      |
|                   | POST   | `/api/auth/logout`           | User logout                     |
|                   | GET    | `/api/auth/me`               | Retrieve current user profile   |
|                   | POST   | `/api/auth/refresh`          | Refresh JWT token               |
| **Users**         | GET    | `/api/users`                 | List all users (Admin only)     |
|                   | POST   | `/api/users`                 | Create new user (Admin only)    |
|                   | GET    | `/api/users/{user}`          | Get user details                |
|                   | PATCH  | `/api/users/{user}`          | Update user information         |
|                   | DELETE | `/api/users/{user}`          | Delete user                     |
| **Programs**      | GET    | `/api/programs`              | List training programs          |
|                   | POST   | `/api/programs`              | Create a training program       |
|                   | GET    | `/api/programs/{program}`    | Get program details             |
|                   | PATCH  | `/api/programs/{program}`    | Update program                  |
|                   | DELETE | `/api/programs/{program}`    | Delete program                  |
| **Training**      | GET    | `/api/training-sessions/{training_session}`| Get session details   |
| **Sessions**      | PATCH  | `/api/training-sessions/{training_session}`| Update session        |
|                   | GET    | `/api/training-sessions/{training_session}/exercises`| Get session exercises |
|                   | PATCH  | `/api/training-sessions/{training_session}/exercises/{exercise}`| Update session exercise |

📘 Full documentation available at: `/api/documentation` (after setup)

<p align="left">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer 2.5+
- MySQL 8.0+

### Running

To run a local instance, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/SimonMMB/Sprint_5.git
   ```
2. Install dependencies: 
   ```sh
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env`  
4. Generate app key:  
   ```sh
   php artisan key:generate
   ```
5. Configure database credentials in `.env`  
6. Start your MySQL server and create a database named `StayStrong`
7. Generate Passport keys:
   ```sh
   php artisan passport:install
   ```
   *Use `--force` if keys already exist*
8. Run migrations and seed the database:
   ```sh
   php artisan migrate --seed
   ```
9. Start the local server:
   ```sh
   php artisan serve
   ```
10. Use Postman or any REST client to test the API

<p align="left">(<a href="#readme-top">back to top</a>)</p>

## Authentication and Usage

### 🔐 Authentication

This API uses Laravel Passport (OAuth 2.0) and Spatie Permission for managing user authentication and access.

- 🛡️ **Role-based routing**: Access to routes is enforced based on user role
- 🔑 **OAuth 2.0 tokens**: Required for all protected endpoints

### 👥 User Roles

The platform defines three roles:

---

### 🏋️ Trainee  
- Full control over their own data (CRUD)  
- Created:
  1. Automatically via `POST /api/auth/register`
  2. Manually by an Admin

---

### 🧑‍🏫 Trainer  
- Can view data of other users  
- Cannot create, update, or delete  
- Can only be created by an Admin

---

### 🧠 Admin  
- Full access to all resources  
- The first Admin is created during initial setup via `DatabaseSeeder.php`

---

### Example Usage

**1. Register a trainee**  
```http  
POST /api/auth/register
```
```json
{
  "name": "MIAMI BEACH",
  "email": "miami@beach.com",
  "password": "qwerty123",
  "password_confirmation": "qwerty123"
}
```

**2. Log in and retrieve access token**  
```http  
POST /api/auth/login
```
```json
{
  "email": "miami@beach.com", 
  "password": "qwerty123"
}
```

**3. Log in as admin (from seeder)**  
```http  
POST /api/auth/login
```
```json
{
  "email": "arizona@alabama.com", 
  "password": "qwerty123"
}
```

**4. Create a training program**  
```http  
POST /api/programs
Authorization: Bearer {access_token}
```
```json
{
  "training_frequency": 3,
  "training_duration": 3,
  "start_date": "2025-05-20",
  "estimated_end_date": "2025-08-20"
}
```

**5. View training sessions**  
```http  
GET /api/training-sessions/{training_session}/exercises
Authorization: Bearer {access_token}
```

_Response Example omitted for brevity_

<p align="left">(<a href="#readme-top">back to top</a>)</p>

## Documentation

📚 The API is documented using Swagger, providing an interactive interface to explore and test endpoints.

Access it at:
```
http://localhost:8000/api/documentation
```

You’ll find details for:<br>
✅ Required parameters<br>
✅ Request/response formats<br>
✅ Authentication headers<br>
✅ Status codes

<p align="left">(<a href="#readme-top">back to top</a>)</p>
