# Healthcare Management System (TypeScript)

A full-stack Healthcare Management System built with the MERN stack and TypeScript. The application allows patients to register, log in, explore doctors, book appointments, and make online payments through Stripe.

The project was originally developed using JavaScript and subsequently migrated to TypeScript across both the frontend and backend to improve type safety, maintainability, and code quality.

## Live Demo

- **Frontend:** https://healthcare-system-frontend-ts.vercel.app
- **Backend:** https://healthcare-system-backend-ts.vercel.app
- **GitHub Repository:** https://github.com/muhammad-ilyas840/Healthcare-system

## Features

### Authentication and Authorization
- Patient and doctor registration and login.
- JWT-based authentication.
- Role-based access for patients and doctors.
- Protected application routes.

### Patient Features
- Browse available doctors.
- Book doctor appointments.
- View appointment information.
- Make appointment payments through Stripe.

### Doctor Features
- Doctor dashboard.
- Manage appointment-related functionality.

### Payment Integration
- Stripe Checkout integration.
- Appointment payment processing.
- Stripe webhook integration for payment event handling.
- Payment status management.

### TypeScript Migration
- Converted frontend components and backend modules to TypeScript.
- Added interfaces and types for application data.
- Improved type safety across API requests and responses.
- Added TypeScript type-checking scripts.
- Successfully built both frontend and backend.

## Technology Stack

**Frontend**
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

**Authentication and Payments**
- JSON Web Tokens (JWT)
- Stripe

**Development and Deployment**
- Git and GitHub
- Vercel
- npm

## Project Structure

```text
Healthcare-system-ts-work/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── dist/
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── public/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Utils/
│   └── ...
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*The structure above is a simplified overview.*

## Getting Started

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/muhammad-ilyas840/Healthcare-system.git
```

### 2. Navigate to the Project

```bash
cd Healthcare-system
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file in the project root for the frontend:

```env
VITE_API_URL=http://localhost:4000
VITE_Stripe_Publishable_key=your_stripe_publishable_key
```

Create another `.env` file inside the `backend` directory:

```env
Mongo_Url=your_mongodb_connection_string
Jwt_secret=your_jwt_secret
Stripe_secret_key=your_stripe_secret_key
Stripe_webhook_secret=your_stripe_webhook_secret
PORT=4000
```

**Important:**
- Never commit `.env` files or expose secret keys in your repository.
- Use Stripe test-mode keys for local testing.
- Configure the Stripe webhook signing secret for your local webhook listener.

### 6. Run the Backend

From the `backend` directory, use the development script configured in `backend/package.json`.

### 7. Run the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL, usually:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the frontend for production |
| `npm run typecheck` | Checks TypeScript types |
| `npm run lint` | Runs ESLint |

### Backend

| Command | Description |
|---|---|
| `npm run build` | Compiles TypeScript |
| `npm run typecheck` | Checks TypeScript types |
| `npm start` | Starts the compiled backend |

Run backend commands from the `backend` directory.

## Deployment

The application is deployed on Vercel using separate frontend and backend projects.

- Frontend: Vite production build.
- Backend: Express application deployed through Vercel.
- Database: MongoDB.
- Payments: Stripe.

Production environment variables are configured separately in the respective Vercel projects.

## Learning Objectives

This project helped strengthen practical experience with:

- Full-stack MERN application development.
- Migrating an existing JavaScript application to TypeScript.
- React and Express with TypeScript.
- MongoDB integration using Mongoose.
- JWT authentication and role-based authorization.
- Stripe Checkout and webhook integration.
- Git, GitHub, and production deployment.
- Debugging and resolving production issues.

## Future Improvements

- Further improve application security and validation.
- Expand automated testing.
- Improve error handling and logging.
- Add additional healthcare management features.

## Author

**Muhammad Ilyas**

Full-Stack Web Developer | MERN Stack | Next.js | TypeScript

GitHub: https://github.com/muhammad-ilyas840

---

*Built with React, Node.js, Express, MongoDB, and TypeScript.*