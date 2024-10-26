import { MelodyMessage } from "@/lib/types";
import { createChatMessage, fetchMessagesByChatId } from "@/store/features/melody/melodyThunks";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { selectChat } from "@/store/features/melody/melodySlice";

// Socket Status
type SocketStatus = "connected" | "connecting" | "disconnected" | "disconnecting" | "error";

// Socket Interface
interface IChatSocketContext {
	prompt: string;
	setPrompt: (newPrompt: string) => void;
	messages: MelodyMessage[];
	socket: Socket | null;
	loading: boolean;
	status: SocketStatus;
	sendMessage: (message: string) => void;
	error: string | null;
	connect: () => void;
	disconnect: () => void;
	changeChat: (chatId: string) => void; // Add changeChat function
}

export const ChatSocketContext = createContext<IChatSocketContext | undefined>(undefined);

export const ChatSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated, jwtToken } = useAuth();
	const dispatch = useAppDispatch();
	const selectedChatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const selectedChatMessages = useSelector((state: RootState) => state.melody.messages);
	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<MelodyMessage[]>(selectedChatMessages);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [status, setStatus] = useState<SocketStatus>("disconnected");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Set Backend Configuration
	const backendUrl = process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL || "https://prod-backend-url.com"
		: process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL || "http://localhost";

	const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || 8080;

	const addMessageToLocalState = (newMessage: MelodyMessage) => {
		setMessages((prevMessages) => {
			// Error Handling Logging
			console.log('Previous Messages:', prevMessages);
			console.log('New Message:', newMessage);
			return [...prevMessages, newMessage]
		});
	};

	// Fetch messages on chat id change or dispatch
	useEffect(() => {
		if (selectedChatId) {
			dispatch(fetchMessagesByChatId({ chatId: selectedChatId }));
		} else {
			setMessages([]);
		}
	}, [selectedChatId, dispatch]);

	// Not sure what the point of this is
	// useEffect(() => {
	// 	setMessages(selectedChatMessages);
	// }, [selectedChatMessages]);

	// Log the state of loading
	useEffect(() => {
		console.log("loading: " + loading);
	}, [loading])

	// Websockets
	useEffect(() => {
		// Doesn't need to connect if not authenticated
		if (!isAuthenticated || !jwtToken) return;

		const newSocket = io(`${backendUrl}:${backendPort}`, {
			autoConnect: true,
			transports: ["websocket"],
			auth: {
				token: jwtToken
			}
		});

		// Connect
		newSocket.on("connect", () => {
			setStatus("connected");
			console.log("Connected to socket!");
		});

		// Disconnect
		newSocket.on("disconnect", () => {
			setStatus("disconnected");
			console.log("Disconnected from socket!");
		});

		// Error
		newSocket.on("error", (err) => {
			setStatus("error");
			setError("Connection error: " + err.message);
			console.error("Connection error: ", err);
		});

		// Receive from Melody
		newSocket.on("receive_melody_message", (data: { text: string }) => {
			console.log('Received message from Melody:', data);

			// Append system message to local state
			addMessageToLocalState({ type: 'SYSTEM_TEXT', content: data.text });

			setLoading(false);
		});

		setSocket(newSocket);

		return () => {
			newSocket.off("connect");
			newSocket.off("disconnect");
			newSocket.off("error");
			newSocket.off("receive_melody_message");
			newSocket.close();
		};
	}, [isAuthenticated, jwtToken, backendUrl, backendPort]);

	// Change Chat
	const changeChat = useCallback((chatId: string) => {
		if (!socket) return;

		socket.emit("change_chat", chatId);
		dispatch(selectChat({ chatId })); // Handle Redux State

		// // Reset local message state
		setMessages([]);
		setError(null);
		setLoading(false);

		// Fetch new chat messages
		dispatch(fetchMessagesByChatId({ chatId }))
			.unwrap()	// Wait for the fetch to complete
			.then(fetchedMessages => {
				setMessages(fetchedMessages);	// Set messages in local state
			})
			.catch(err => {
				setError('Failed to load messages');
				console.error('Error fetching messages:', err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [socket, dispatch]);

	// Send to Melody
	const sendMessage = useCallback((message: string) => {
		if (!socket || !selectedChatId) return;

		setLoading(true);
		setError(null);

		// Create a new user message and add it to the state
		const newUserMessage: MelodyMessage = { type: "USER_TEXT", content: message };
		addMessageToLocalState(newUserMessage);

		// Save the user message to the database
		dispatch(createChatMessage({ chatId: selectedChatId, message }));

		// Send the message to Melody through WebSocket
		socket.emit("send_to_melody", {
			chatId: selectedChatId,
			prompt: message
		});
	}, [socket, selectedChatId, dispatch]);

	return (
		<ChatSocketContext.Provider
			value={{
				prompt,
				setPrompt,
				messages,
				loading,
				error,
				socket,
				connect: () => socket?.connect(),  // Simplified connect
				disconnect: () => socket?.disconnect(), // Simplified disconnect
				sendMessage,
				status,
				changeChat
			}}
		>
			{children}
		</ChatSocketContext.Provider>
	);
};

export const useChatSocket = () => {
	const context = useContext(ChatSocketContext);

	if (!context) {
		throw new Error("useChatSocket must be used within a ChatSocketProvider");
	}

	return context;
};