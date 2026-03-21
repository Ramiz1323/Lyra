import { generateResponse, generateTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessages(req, res) {
    try {
        const { message, chatId } = req.body; 

        let title = null;
        let chat = null;

        // Handle Chat Thread Creation
        if (!chatId) {
            title = await generateTitle(message);
            chat = await chatModel.create({
                user: req.user.id,
                title
            });
        } else {
            chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
            if (!chat) {
                return res.status(404).json({ message: "Chat not found or unauthorized" });
            }
        }

        const userMessage = await messageModel.create({
            chat: chat._id,
            content: message,
            role: "user"
        });

        chat.updatedAt = new Date();
        await chat.save();

        const allMessages = await messageModel.find({ chat: chat._id });

        const aiResponseContent = await generateResponse(allMessages);

        const aiMessage = await messageModel.create({
            chat: chat._id,
            content: aiResponseContent,
            role: "ai"
        });

        res.status(201).json({
            title: chat.title,
            chat,
            userMessage,
            aiMessage,
        });
    } catch (error) {
        console.error("Error in sendMessages:", error.message || "Unknown error");
        if (error.stack) console.error("Stack trace:", error.stack);
        res.status(500).json({ message: "Internal server error while processing message" });
    }
}

export async function getChats(req, res) {
    try {
        const userId = req.user.id;
        const chats = await chatModel.find({ user: userId }).sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        console.error("Error in getChats:", error);
        res.status(500).json({ message: "Failed to fetch chats" });
    }
}

//Get the messages inside the chats
export async function getMessages(req, res) {
    try {
        const chatId = req.params.id;
        const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found or unauthorized" });
        }

        const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
}

export async function deleteChat(req, res) {
    try {
        const chatId = req.params.id;

        const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found or unauthorized" });
        }

        await chatModel.findByIdAndDelete(chatId);
        await messageModel.deleteMany({ chat: chatId });

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error in deleteChat:", error);
        res.status(500).json({ message: "Failed to delete chat" });
    }
}