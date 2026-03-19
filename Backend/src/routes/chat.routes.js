import { Router } from "express";
import { sendMessages, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

/**
@route POST /api/chats/message
@desc Send a message
@access Private
*/
chatRouter.post("/message", authUser, sendMessages);

/**
@route GET /api/chats
@desc Get all chats
@access Private
*/
chatRouter.get("/", authUser, getChats);

/**
@route GET /api/chats/:id/messages
@desc Get all messages
@access Private
*/
chatRouter.get("/:id/messages", authUser, getMessages);

/**
@route DELETE /api/chats/delete/:id
@desc Delete a chat
@access Private
*/
chatRouter.delete("/delete/:id", authUser, deleteChat);

export default chatRouter;