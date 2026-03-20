import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import * as chatApi from "./service/chat.api";

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
    async (_, { rejectWithValue }) => {
        try {
            return await chatApi.getChats();
        } catch (err) {
            return rejectWithValue(err?.message || err || "Failed to fetch chats");
        }
    }
);

export const fetchMessages = createAsyncThunk(
    "chat/fetchMessages",
    async (chatId, { rejectWithValue }) => {
        try {
            const messages = await chatApi.getMessages(chatId);
            return { chatId, messages };
        } catch (err) {
            return rejectWithValue(err?.message || err || "Failed to fetch messages");
        }
    }
);

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ message, chatId }, { rejectWithValue }) => {
        try {
            return await chatApi.sendMessages({ message, chatId });
        } catch (err) {
            return rejectWithValue(err?.message || err || "Failed to send message");
        }
    }
);

export const removeChat = createAsyncThunk(
    "chat/removeChat",
    async (chatId, { rejectWithValue, dispatch }) => {
        try {
            await chatApi.deleteChat(chatId);
            return chatId;
        } catch (err) {
            return rejectWithValue(err?.message || err || "Failed to delete chat");
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        isSidebarOpen: false, // Mobile sidebar toggle
        status: "idle",
        error: null
    },
    reducers: {
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
            state.isSidebarOpen = false; // Close sidebar on selection
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Chats
            .addCase(fetchChats.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chats = action.payload.reduce((acc, chat) => {
                    acc[chat._id] = chat;
                    return acc;
                }, {});
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Fetch Messages
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { chatId, messages } = action.payload;
                if (state.chats[chatId]) {
                    state.chats[chatId].messages = messages;
                }
            })
            // Send Message
            .addCase(sendMessage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { chat, userMessage, aiMessage } = action.payload;
                
                // Update or add chat to list
                state.chats[chat._id] = {
                    ...chat,
                    messages: [...(state.chats[chat._id]?.messages || []), userMessage, aiMessage]
                };

                // Auto-set as current if it's a new chat
                if (!state.currentChatId) {
                    state.currentChatId = chat._id;
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Remove Chat
            .addCase(removeChat.fulfilled, (state, action) => {
                const chatId = action.payload;
                delete state.chats[chatId];
                if (state.currentChatId === chatId) {
                    state.currentChatId = null;
                }
            });
    }
});

export const { setCurrentChatId, toggleSidebar, setSidebarOpen, clearError } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
const selectChatState = (state) => state.chat;

export const selectAllChats = createSelector([selectChatState], (chat) => chat.chats);
export const selectCurrentChatId = createSelector([selectChatState], (chat) => chat.currentChatId);
export const selectChatStatus = createSelector([selectChatState], (chat) => chat.status);
export const selectChatError = createSelector([selectChatState], (chat) => chat.error);
export const selectIsSidebarOpen = createSelector([selectChatState], (chat) => chat.isSidebarOpen);

const DEFAULT_CHAT = { messages: [], title: 'New Discovery' };

export const selectCurrentChat = createSelector(
    [selectAllChats, selectCurrentChatId],
    (chats, currentChatId) => chats[currentChatId] || DEFAULT_CHAT
);

export const selectSortedChats = createSelector(
    [selectAllChats],
    (chats) => Object.values(chats).sort((a, b) => 
        new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    )
);
