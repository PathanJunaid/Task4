Below is a sample `README.md` file tailored for the frontend of your Angular-based Leave Management System. It includes setup instructions, project structure, features, and other relevant details based on the work we’ve done so far.

---

# Leave Management System - Frontend

This is the frontend application for the Leave Management System, built with **Angular 17** and **Angular Material**. It provides a user-friendly interface for employees to apply for leaves and view their requests, while admins can manage leave requests, view analytics, and handle employee data.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Available Routes](#available-routes)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### For Employees
- **Apply for Leave**: Submit leave requests with start/end dates, leave type, and reason.
- **View Leave Requests**: See a list of personal leave requests with statuses (Pending, Approved, Rejected).
- **Logout**: Securely log out of the system.

### For Admins
- **Admin Dashboard**:
  - **Pending Leave Requests**: View and approve/reject pending requests with a filter (currently fixed to "Pending").
  - **Analytics**:
    - Top 10 employees taking frequent leaves.
    - Top 5 employees with no paid leave remaining.
    - Recent 5 employees added.
  - **Employee Management**: View all employees’ leave balances and add new employees.
- **Leave Balance**: View leave balances (available to admins only).
- **Leave Requests**: View all leave requests (shared with employees but shows all for admins).

### General
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Animations**: Smooth transitions using Angular animations.
- **Error Handling**: User-friendly error messages with retry options.

---

## Technologies
- **Angular**: v17 (standalone components)
- **Angular Material**: For UI components (tables, forms, tabs, etc.)
- **TypeScript**: For type-safe development
- **RxJS**: For reactive programming and HTTP requests
- **CSS/SCSS**: For styling with responsive design
- **Local Storage**: For persisting user authentication state

---

## Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── auth/                  # Authentication service and guards
│   │   ├── services/              # API services (LeaveRequest, LeaveBalance, User)
│   │   └── constants/             # API endpoints and constants
│   ├── features/
│   │   ├── auth/
│   │   │   └── login/             # Login component
│   │   ├── leave/
│   │   │   ├── leave-application/ # Leave application component
│   │   │   ├── leave-balance/     # Leave balance component
│   │   │   └── leave-requests/    # Leave requests component
│   │   └── admin/
│   │       └── admin-dashboard/   # Admin dashboard component
│   ├── app.component.ts           # Root component
│   ├── app.routes.ts              # Application routes
│   └── styles.scss                # Global styles
├── environments/                  # Environment config (dev/prod)
├── assets/                        # Static assets (images, etc.)
├── index.html                     # Main HTML file
└── main.ts                        # Bootstrap file
```

---

## Prerequisites
- **Node.js**: v18.x or later
- **npm**: v9.x or later (comes with Node.js)
- **Angular CLI**: Install globally with `npm install -g @angular/cli@17`

---

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd leave-management-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Open `src/environments/environment.ts` and update the `apiUrl` to match your backend API:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:5000/api'
     };
     ```
   - For production, update `environment.prod.ts` accordingly.

---

## Running the Application
1. **Development Mode**:
   ```bash
   ng serve --no-hmr
   ```
   - Open `http://localhost:4200` in your browser.
   - `--no-hmr` disables Hot Module Replacement for stability during development.

2. **Production Build**:
   ```bash
   ng build --prod
   ```
   - Output is generated in the `dist/` folder.

---

## Available Routes
| Route                  | Access         | Description                          |
|------------------------|----------------|--------------------------------------|
| `/login`              | Public         | Login page                          |
| `/leave-application`  | Employees      | Apply for a leave                   |
| `/leave-requests`     | All Users      | View personal (employees) or all (admins) leave requests |
| `/leave-balance`      | Admins         | View leave balances                 |
| `/admin/dashboard`    | Admins         | Admin dashboard with requests, analytics, and employee management |
| `/**`                 | All Users      | Redirects to `/leave-requests` if logged in, else `/login` |

---

## Authentication
- **Login**: Uses email and password, stores JWT and user data (including role) in `localStorage`.
- **Role-Based Access**:
  - **Admin**: Identified by `role: 'Admin'` (mapped from backend `role: 0`).
  - **Employee**: Identified by `role: 'User'` (mapped from backend `role: 1`).
- **Persistence**: User state is restored from `localStorage` on page refresh via `AuthService`.
- **Guards**:
  - `authGuard`: Ensures users are logged in and restricts admin routes to admins only.
  - `loggedInGuard`: Prevents logged-in users from accessing `/login`.

---


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
