# Disaster Helper (Server)

REST API backend server for Disaster Helper built with Node.js, Express 5, and MongoDB Atlas.

---

## Architecture & API Overview

Provides full CRUD REST endpoints for managing users, help requests, volunteer assignments, donations, feedback, notices, and bulletins.

### API Endpoints

- **Users**: `/api/users` (GET, POST, PUT, DELETE)
- **Help Requests**: `/api/help` (GET, POST, PUT, DELETE, GET by location)
- **Volunteers**: `/api/volunteers` (GET, POST, PUT, DELETE, POST `/assign`)
- **Donations**: `/api/donations` (GET, POST, GET `/total`, GET `/recent`)
- **Feedback**: `/api/feedback` (GET, POST, PUT, DELETE)
- **Notices**: `/api/notices` (GET, POST, PUT, DELETE)
- **Bulletins**: `/api/bulletins` (GET, POST, PUT, DELETE)

---

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure `.env`:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
