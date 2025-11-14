
# **🌌 Gemini Clone – AI Chat Application**

A modern AI chat interface inspired by Google Gemini, built with a React frontend and a Node.js backend using Google Generative AI.

## **🚀 Features**

###🧠 AI-Powered Responses

• Connects to Google Generative AI (Gemini API)
• Supports real-time text responses

### 🎨 Modern UI (Client)

• Clean and responsive interface
• Smooth chat experience
• Gemini-style layout and animations
• Built using React 

### ⚙️ Backend API (Server)

• Secure API endpoint to handle Gemini requests
• API key securely stored using environment variables
• Built using Node.js + Express

### 🔐 Security

• .env for private API keys
• Sensitive keys NOT stored on GitHub
• Safe request proxying through backend

## **🏗️ Project Structure**
```
Gemini-Clone/
│
├── Client/       # Frontend React app
│   ├── public/
│   ├── src/
│   └── package.json
│
├── Server/       # Backend API service
│   ├── index.js
│   ├── config/
│   ├── routes/
│   └── package.json
│
└── README.md
```

## 🖥️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/your-username/gemini-clone.git
cd gemini-clone
```

### 2️⃣ Setup the Server
```
cd Server
npm install
```

Create a .env file inside Server/:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Start the backend:
```
npm start
```

### 3️⃣ Setup the Client
```
cd ../Client
npm install
npm start
```

## 🧩 Tech Stack
### Frontend (Client)

• React.js
• CSS

### Backend (Server)

• Node.js
• Express.js
• Google Generative AI SDK

## Server

Host your server on:

• Render
• Vercel (Serverless)
• AWS / DigitalOcean


## ✨ Future Enhancements

• Add conversation history
• Add image input support
• Support multiple AI models
• Add dark / light mode
• Save chats to database

⭐ Show Some Support

If you like this project, give it a ⭐ on GitHub!



