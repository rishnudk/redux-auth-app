```markdown
# REDUX  User Authentication App

A simple **MERN Stack Authentication** application with JWT, Redux Toolkit, and Cloudinary for image upload.  
This app supports **User login/register**, **Admin authorization**, and secure **JWT cookie authentication**.

---

## 🚀 Tech Stack
- **Frontend**: React + Redux Toolkit + Axios
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Cloudinary

---

## 📂 Folder Structure

```
project-root/
├── backend/
│   ├── controllers/      # Request handlers (login, register, user CRUD)
│   ├── middleware/       # Authentication & error middleware
│   ├── models/           # Mongoose models (User schema etc.)
│   ├── routes/           # Express routes (auth, user, admin APIs)
│   ├── utils/            # Helper files (cloudinary config, token generator)
│   ├── server.js         # Express app entry point
│   └── config/           # DB connection config
│
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── actions/      # Redux async actions (authAction.js)
│   │   ├── slices/       # Redux slices (authSlice.js)
│   │   ├── components/   # React components (Navbar, Forms, etc.)
│   │   ├── pages/        # React pages (Login, Register, Dashboard)
│   │   ├── store.js      # Redux store configuration
│   │   └── App.js        # Main React app
│   └── package.json      # Frontend dependencies
│
├── .env                  # Environment variables
├── .gitignore            # Ignored files/folders
├── package.json          # Backend dependencies
└── README.md             # Documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/rishnudk/redux-auth-app.git
cd mern-auth-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

### 4️⃣ Run the app
```bash
# Run backend (from backend folder)
npm run dev

# Run frontend (from frontend folder)
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file in the **backend** root:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/reactUser
JWT_SECRET=mySuperSecretKey123
MODE_ENV=development
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🙈 .gitignore

Create a `.gitignore` file in both **backend** and **frontend**:

```gitignore
# dependencies
/node_modules
/frontend/node_modules
/backend/node_modules

# environment variables
.env

# logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# build
/frontend/build
/dist

# misc
.DS_Store
```

---

## 🔐 Authentication Flow (How It Works)

1. **Frontend (React + Axios)**  
   - User submits login form → `loginUser` action triggers Axios POST request → `http://localhost:8000/api/auth/login`.  
   - Axios sends `{ email, password }` + `{ withCredentials: true }` to include cookies.  

2. **Backend (Express + JWT)**  
   - Auth Controller verifies credentials.  
   - If valid → Generates a **JWT token** signed with `JWT_SECRET`.  
   - Token is sent back in **HTTP-only cookie** (more secure than localStorage).  

3. **Middleware (authMiddleware.js)**  
   - `authenticate` checks for JWT in cookies.  
   - If valid → attaches `req.user` with user data.  
   - If invalid/missing → `401 Unauthorized`.  

4. **Frontend (Redux Store + LocalStorage)**  
   - On successful login → user data stored in `localStorage` + Redux state.  
   - `authSlice` manages user session & logout.  

---

## 👤 Admin Authorization

- `authorizeAdmin` middleware checks if `req.user.isAdmin === true`.  
- If not → returns `401 Not authorized as an admin`.  
- Used to protect admin-only routes like **user management**.  

---

## ✅ Features
- User Register & Login
- JWT Authentication via Cookies
- Redux Toolkit for State Management
- Admin Authorization Middleware
- Cloudinary Integration for Image Uploads
- Secure Password Hashing with bcrypt

---

