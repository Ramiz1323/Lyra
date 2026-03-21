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

## 🤖 AI & Research Service (Mistral + Tavily)

Lyra AI is powered by Mistral AI and Tavily for real-time web research, providing elite intelligence and synthesized information.

### Required Environment Variables
Ensure the following are set in your `.env` file:
*   `MISTRAL_API_KEY`: API key from [Mistral AI](https://mistral.ai/).
*   `TAVILY_API_KEY`: API key from [Tavily](https://tavily.com/) for research.

### Tavily Configuration
The `searchInternet` tool is configured with:
- `max_results: 5`
- `searchDepth: "basic"` (Optimized for speed and concise insights)

---

## 📧 Email Service Setup (Gmail OAuth2)

The backend uses `nodemailer` with Google OAuth2 for sending verification emails.

### Required Environment Variables
Ensure the following are set in your `.env` file:
- `GOOGLE_USER`: Your Gmail address.
- `GOOGLE_CLIENT_ID`: OAuth2 Client ID from Google Cloud Console.
- `GOOGLE_CLIENT_SECRET`: OAuth2 Client Secret from Google Cloud Console.
- `GOOGLE_REFRESH_TOKEN`: Refresh token generated via OAuth2 Playground.

### 🛠 Troubleshooting `invalid_grant`
If you see `Error: invalid_grant: Token has been expired or revoked`:
1.  Go to the [OAuth2 Playground](https://developers.google.com/oauthplayground).
2.  Use your Client ID and Client Secret to authorize `https://mail.google.com/`.
3.  Exchange the authorization code for a new **Refresh Token**.
4.  Update `GOOGLE_REFRESH_TOKEN` in your `.env`.

> [!TIP]
> To prevent tokens from expiring every 7 days, set your Google Cloud Project status to **"In Production"** in the OAuth Consent Screen.

---

### 21/03/2026
*   **AI Agent Upgrade**: Switched to Mistral AI and implemented a "Research Mode" using Tavily for real-time internet search.
*   **Bug Fixes**: 
    - Resolved Mongoose `ValidationError` on `content` field.
    - Fixed Mistral `ZodError` by updating SDK and resolving schema mismatches.
    - Corrected Tavily search input handling for LangChain compatibility.
*   **Robustness**: Added safety checks and improved error diagnostics in `ai.service.js` and `chat.controller.js`.
*   **Mail Service Enhancement**: Improved error logging and hints for OAuth2 authentication failures in `mail.service.js`.
*   **Documentation**: Added comprehensive Email Service setup and troubleshooting instructions to `README.md`.

### 19/03/2026
*   **Expanded Chat API**:
    *   `GET /api/chats`: Retrieves all chats for the authenticated user.
    *   `GET /api/chats/:id/messages`: Retrieves message history for a specific chat (with ownership check).
    *   `DELETE /api/chats/delete/:id`: Deletes a chat and its entire message history securely.
*   **Socket.io Integration**: Established a bi-directional event system for real-time communication.
*   **Security & Middleware**: Integrated `authUser` protection across all `/api/chats` endpoints.

