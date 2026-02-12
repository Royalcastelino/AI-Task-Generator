# Tasks Generator (Mini Planning Tool)

A production-ready MERN stack application that transforms high-level goals into structured user stories and engineering tasks using AI.

## Features

- **AI Generation**: Leverages OpenAI to generate 5-8 user stories and 10-20 engineering tasks.
- **Structured Form**: Collect goals, target users, constraints, and platform types.
- **Interactive Task Board**: Grouped by Frontend, Backend, and DevOps with Drag & Drop reordering (@dnd-kit).
- **Inline Editing**: Edit, add, or delete tasks directly on the board.
- **History Tracking**: View the last 5 generated specifications stored in MongoDB.
- **Health Checks**: Dedicated status page for monitoring Server, Database, and LLM connectivity.
- **Export Options**: Copy as Markdown or download as .md/.txt files.

## Tech Stack

- **Frontend**: React (Vite + TypeScript), Tailwind CSS, Axios, React Router, @dnd-kit
- **Backend**: Node.js, Express, MongoDB (Mongoose), OpenAI SDK
- **DevOps**: dotenv, CORS

## Project Structure

```
task-generator/
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, History, Status
│   │   ├── components/   # UI components, Task Board, Form
│   │   ├── api.ts        # Axios configuration
│   │   ├── App.tsx       # Routing
│   │   └── main.tsx
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── controllers/  # API logic
│   │   ├── routes/       # Express routes
│   │   ├── models/       # Mongoose schemas
│   │   ├── services/     # OpenAI integration
│   │   ├── config/       # Database connection
│   │   └── server.js     # Entry point
│   ├── package.json
│   └── .env.example
└── README.md
```

## ⚙️ Installation & Running

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API Key

### 1. Backend Setup
1. Navigate to `/backend`
2. Run `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Run `npm run dev` (for development) or `npm start` (for production)

### 2. Frontend Setup
1. Navigate to `/frontend`
2. Run `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run `npm run dev`

## 🚢 Deployment Instructions

### Backend (Render)
1. Connect your GitHub repository to Render.
2. Choose "Web Service" and select the `backend` directory.
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add Environment Variables from your `.env`.

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. In "Network Access", allow your server's IP (or 0.0.0.0/0 for testing).
3. Copy the Connection String and add it to your backend environment variables.

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel.
2. Select the `frontend` directory as the project root.
3. Vercel will automatically detect Vite.
4. Add the `VITE_API_URL` environment variable pointing to your deployed Backend URL.
