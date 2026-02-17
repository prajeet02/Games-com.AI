# 🚀 How to Run This Project

## Prerequisites

Make sure you have installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** (for cloning) - [Download](https://git-scm.com)

Verify installation:
```bash
node --version
npm --version
```

## Project Structure

```
chat-gpt/
├── backend/          # Express.js API server
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── .env
├── frontend/         # React + Vite app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Verify Environment Variables

Check `backend/.env` has these variables:
```env
MONGODB_URL=mongodb+srv://...
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=2j2j2j...
COOKIE_SECRET=kgjhri...
PORT=5001
```

All variables are already set! ✅

## Step 3: Run the Project

You need **3 terminals** (or terminal tabs):

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on 5001, Database is also connected
```

### Terminal 2: Frontend Development Server
```bash
cd frontend
npm run dev
```

Expected output:
```
Local: http://localhost:5173
```

### Terminal 3: (Optional) Monitor Logs
```bash
# Just keep this open to see any errors
```

## Step 4: Open in Browser

1. Open your browser
2. Go to: **http://localhost:5173**
3. You should see the login page

## Step 5: Test the App

1. **Sign Up**: Create a new account
2. **Login**: Use your credentials
3. **Chat**: Send a message and get AI response
4. **Logout**: Test logout functionality

## 🎯 Common Commands

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run kill-port    # Kill process on port 5001
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5001
cd backend
npm run kill-port

# Or manually
lsof -i :5001
kill -9 <PID>
```

### Dependencies Not Installed
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Failed
- Check internet connection
- Verify MONGODB_URL in `.env`
- Check IP whitelist in MongoDB Atlas

### Frontend Won't Load
- Check backend is running on port 5001
- Check browser console for errors
- Clear browser cache (Ctrl+Shift+Delete)

### API Calls Failing
- Check backend is running
- Check CORS is enabled
- Check API URL in frontend config

## 📊 Architecture

```
Browser (localhost:5173)
    ↓
Frontend (React + Vite)
    ↓
Backend API (localhost:5001)
    ↓
MongoDB Atlas (Cloud)
    ↓
Gemini AI API
```

## 🔑 Key Features

✅ User Authentication (JWT)
✅ Chat History Storage
✅ AI Responses (Gemini)
✅ Responsive Design
✅ Secure Cookies
✅ Password Encryption

## 📝 Environment Variables Explained

| Variable | Purpose |
|----------|---------|
| MONGODB_URL | Database connection |
| GEMINI_API_KEY | AI API key |
| JWT_SECRET | Token signing |
| COOKIE_SECRET | Cookie encryption |
| PORT | Server port (5001) |

## ✅ Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (backend & frontend)
- [ ] `.env` file configured
- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can login and chat

## 🎉 You're Ready!

Your full-stack chat application is now running locally!

**Frontend:** http://localhost:5173
**Backend:** http://localhost:5001
**Database:** MongoDB Atlas (Cloud)

Enjoy! 🚀

