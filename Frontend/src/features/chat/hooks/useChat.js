import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeSocketConnection } from "../service/chat.socket";
import { 
    fetchChats, 
    fetchMessages, 
    sendMessage, 
    removeChat,
    setCurrentChatId,
    toggleSidebar,
    setSidebarOpen,
    selectAllChats,
    selectCurrentChatId,
    selectChatStatus,
    selectChatError,
    selectCurrentChat,
    selectSortedChats,
    selectIsSidebarOpen
} from "../chat.slice";

export const useChat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const chats = useSelector(selectAllChats);
    const sortedChats = useSelector(selectSortedChats);
    const currentChatId = useSelector(selectCurrentChatId);
    const currentChat = useSelector(selectCurrentChat);
    const status = useSelector(selectChatStatus);
    const error = useSelector(selectChatError);
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const isLoading = status === "loading";

    useEffect(() => {
        initializeSocketConnection();
        dispatch(fetchChats());
    }, [dispatch]);

    const handleSendMessage = useCallback(({ message, chatId }) => {
        dispatch(sendMessage({ message, chatId }));
    }, [dispatch]);

    const handleGetChats = useCallback(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const handleGetMessages = useCallback((chatId) => {
        dispatch(fetchMessages(chatId));
        dispatch(setCurrentChatId(chatId));
        navigate("/chat");
    }, [dispatch, navigate]);

    const handleDeleteChat = useCallback((chatId) => {
        if (window.confirm('Delete this chat?')) {
            dispatch(removeChat(chatId));
        }
    }, [dispatch]);

    const handleNewChat = useCallback(() => {
        dispatch(setCurrentChatId(null));
        navigate("/chat");
    }, [dispatch, navigate]);

    const handleToggleSidebar = useCallback(() => {
        dispatch(toggleSidebar());
    }, [dispatch]);

    const handleSetSidebarOpen = useCallback((isOpen) => {
        dispatch(setSidebarOpen(isOpen));
    }, [dispatch]);

    return {
        chats,
        sortedChats,
        currentChatId,
        currentChat,
        isSidebarOpen,
        isLoading,
        error,
        
        handleSendMessage,
        handleGetChats,
        handleGetMessages,
        handleDeleteChat,
        handleNewChat,
        handleToggleSidebar,
        handleSetSidebarOpen
    };
};