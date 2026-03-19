import { generateResponse, generateTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessages(req, res) {
    const { message, chat: chatId } = req.body;

    let title = null;
    let chat = null;

    if (!chatId) {
        title = await generateTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    } else {
        chat = await chatModel.findOne({ _id: chatId, user: req.user.id });

        if (!chat) {
            return res.status(403).json({
                message: "Unauthorized access to this chat or chat not found"
            });
        }
    }

    const userMessage = await messageModel.create({
        chat: chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chat._id })

    const response = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chat._id,
        content: response,
        role: "ai"
    })

    res.status(201).json({
        title,
        chat,
        userMessage,
        aiMessage,
    })
}

export async function getChats(req, res) {
    const userId = req.user.id;

    const chats = await chatModel.find({ user: userId });

    res.status(200).json(chats);
}

export async function getMessages(req, res) {
    const chatId = req.params.id;

    const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
    if (!chat) {
        return res.status(403).json({
            message: "Unauthorized access to this chat or chat not found"
        });
    }

    const messages = await messageModel.find({ chat: chatId });
    if (!messages) {
        return res.status(404).json({
            message: "No messages found"
        });
    }

    res.status(200).json(messages);
}

export async function deleteChat(req, res) {
    const chatId = req.params.id;

    const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
    if (!chat) {
        return res.status(403).json({
            message: "Unauthorized access to this chat or chat not found"
        });
    }

    const deletedChat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    });

    await messageModel.deleteMany({
        chat: chatId
    })

    res.status(200).json({
        message: "Chat deleted successfully",
        deletedChat
    });
}