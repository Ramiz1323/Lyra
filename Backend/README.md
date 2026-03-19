# Lyra AI — Backend

This is the backend service for Lyra, providing a RESTful API and real-time communication via Socket.io.

## 🚀 Key Features

*   **Socket.io Integration**: Real-time bidirectional communication enabled via a dedicated socket server.
*   **Authentication**: JWT-based authentication system.
*   **Database**: MongoDB integration for persistent storage.
*   **Modular Architecture**: Clean separation of concerns with controllers, routes, and socket logic.

## 📂 Project Structure

- `src/sockets/` — Socket.io server initialization and event handlers.
- `src/config/` — Database and environment configurations.
- `src/app.js` — Express application setup.
- `server.js` — Entry point that boots the HTTP and Socket servers.

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **Socket.io**
- **Mongoose** (MongoDB)

## 📡 Socket Server

The socket server is initialized in `src/sockets/server.socket.js` and attached to the main HTTP server in `server.js`. It includes:

- **CORS Configuration**: Restricted to `http://localhost:5173`.
- **Event Listeners**: Basic connection logging implemented.
- **Exported Instance**: `getIO()` utility for emitting events from other parts of the application.

---

## 📈 Recent Activity

### 19/03/2026
*   **Expanded Chat API**:
    *   `GET /api/chats`: Retrieves all chats for the authenticated user.
    *   `GET /api/chats/:id/messages`: Retrieves message history for a specific chat (with ownership check).
    *   `DELETE /api/chats/delete/:id`: Deletes a chat and its entire message history securely.
*   **Socket.io Integration**: Established a bi-directional event system for real-time communication.
*   **Security & Middleware**: Integrated `authUser` protection across all `/api/chats` endpoints.
*   **AI Service Upgrade**: Implemented `generateResponse` and `generateTitle` using LangChain and Google Generative AI (Gemini).
