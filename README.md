# Subscription Tracker API

A REST API for tracking and managing subscriptions. Built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js with Express v5
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository

```bash
git clone https://github.com/ishivam0980/Subscription-Tracker-API.git
cd Subscription-Tracker-API
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Start the development server

```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server runs on |
| `NODE_ENV` | Set to `development` or `production` |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`, `24h`) |

## API Endpoints

### Auth

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| POST | `/api/v1/auth/sign-up` | No | Register a new user |
| POST | `/api/v1/auth/sign-in` | No | Login and get a token |
| POST | `/api/v1/auth/sign-out` | No | Logout |

### Users

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| GET | `/api/v1/users` | Yes | Get all users |
| GET | `/api/v1/users/:id` | Yes | Get a user by ID |
| POST | `/api/v1/users` | Yes | Create a user |
| PUT | `/api/v1/users/:id` | Yes | Update a user |
| DELETE | `/api/v1/users/:id` | Yes | Delete a user |

### Subscriptions

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| GET | `/api/v1/subscriptions` | Yes | Get all subscriptions for the logged-in user |
| GET | `/api/v1/subscriptions/:id` | Yes | Get a single subscription |
| POST | `/api/v1/subscriptions` | Yes | Create a new subscription |
| PUT | `/api/v1/subscriptions/:id` | Yes | Update a subscription |
| DELETE | `/api/v1/subscriptions/:id` | Yes | Delete a subscription |

## Authentication

Protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

Get a token by signing in via `POST /api/v1/auth/sign-in`.

## Rate Limiting

Auth routes are rate-limited to 10 requests per 15 minutes per IP to prevent brute-force attacks.

## Scripts

```bash
npm run dev      # Start with nodemon (auto-restart on changes)
npm run start    # Start in production mode
npm run lint     # Run ESLint
npm run lint:fix # Run ESLint and auto-fix issues
```
