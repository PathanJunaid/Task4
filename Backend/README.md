# Backend - Employee Leave Management System

## Overview
This is the backend for the **Employee Leave Management System**, built using **Node.js** with **Express** and **MongoDB**. It provides APIs for user authentication, leave request handling, and admin functionalities.

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (JSON Web Token)** - Authentication
- **bcryptjs** - Password hashing

## Features
- User authentication (Login, Register, Logout)
- Role-based access control (Admin & Employee)
- Leave request submission, approval, and rejection
- Admin dashboard for leave management
- API endpoints for CRUD operations

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/EmployeeLeaveManagement.git
   ```
2. Navigate to the backend folder:
   ```bash
   cd EmployeeLeaveManagement/Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Leave Requests
- `POST /api/leaves` - Submit a leave request
- `GET /api/leaves` - Get all leave requests
- `PUT /api/leaves/:id` - Update leave status (Admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `DELETE /api/users/:id` - Delete a user

## Folder Structure
```
Backend/
│-- config/         # Database connection & configuration
│-- controllers/    # API controllers
│-- middleware/     # Authentication & validation middleware
│-- models/        # Mongoose models
│-- routes/        # API routes
│-- .env           # Environment variables
│-- server.js      # Main server entry point
```

## Contributing
Feel free to submit issues and pull requests!

## License
This project is licensed under the **MIT License**.

