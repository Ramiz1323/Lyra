import { Server } from "socket.io";


// io => server instance
// socket => user connection
// on => event listener
// emit => event emitter

let io;

export function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    console.log("Socket server initialized");

    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
}