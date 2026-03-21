# 🌌 Lyra AI

> **The shortest path from curiosity to clarity.** 
> Lyra AI is a high-velocity research engine that synthesizes the open web into precise, cited insights. Driven by advanced LLMs, it transforms how you discover, learn, and build.

---

## ✨ Features

- 🧠 **Elite Research Intelligence**: Powered by Mistral AI, Lyra provides deep, long-form answers with professional Markdown formatting.
- 🧵 **Thread Management**: Organize your research with persistent chat history. Switch, rename, or delete threads with ease.
- 📱 **Fully Responsive UI**: A premium, glassmorphic design that works perfectly on desktop and mobile.
- ⚡ **Real-time Synthesis**: Powered by Socket.io for instant, streaming-like communication between the interface and AI brain.
- 🔍 **Tavily Research Mode**: Real-time web search capabilities optimized for detailed, cited insights.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + SCSS (Glassmorphic Design) |
| **State** | Redux Toolkit (Thunk-based architecture) |
| **Backend** | Node.js + Express |
| **Real-time** | Socket.io |
| **Database** | MongoDB |
| **AI Brain** | Mistral AI + Tavily (LangChain integration) |

---

## 🚀 Getting Started

### 1. Prerequisite
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Mistral AI API Key
- Tavily API Key (for Research Mode)

### 2. Clone the Repository
```bash
git clone https://github.com/Ramiz1323/Lyra.git
cd Lyra
```

### 3. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
JWT_SECRET=your_jwt_secret
```
Run the server:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
cd ../Frontend
npm install
```
Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:3000/api
```
Start the development server:
```bash
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License. Developed with ❤️ by [Ramiz1323](https://github.com/Ramiz1323).