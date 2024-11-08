import { MelodyMessage } from "@/lib/types";
import { createChat, createChatMessage, fetchMessagesByChatId } from "@/store/features/melody/melodyThunks";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { selectChat } from "@/store/features/melody/melodySlice";
import config from "@/config";

// Socket Status
type SocketStatus = "connected" | "connecting" | "disconnected" | "disconnecting" | "error";

// Socket Interface
interface IChatSocketContext {
	prompt: string;
	setPrompt: (newPrompt: string) => void;
	messages: MelodyMessage[];
	socket: Socket | null;
	loading: boolean;
	waitingForMessageState: string | null;
	status: SocketStatus;
	sendMessage: (message: string, fileUris: string[]) => void;
	error: string | null;
	connect: () => void;
	disconnect: () => void;
	changeChat: (chatId: string, modelName: ModelName) => void;
	createNewChat: (firstPrompt: string, uploadedFiles: string[], modelName: ModelName) => void;
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
	const [waitingForMessageState, setWaitingForMessageState] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Set Backend Configuration
	const backendUrl = process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL || "https://api.oniooo.com"
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

	// Log the state of loading
	useEffect(() => {
		console.log("loading: " + loading);
	}, [loading])

	// Websockets
	useEffect(() => {
		// Doesn't need to connect if not authenticated
		if (!isAuthenticated || !jwtToken) return;

		// ${backendUrl}:${backendPort}
		const newSocket = io(`${config.socketUrl}`, {
			path: '/socket.io',
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
			setLoading(false);
			console.error("Connection error: ", err);
		});

		// Receive from Melody
		newSocket.on("receive_melody_message", (data: { text?: string; fileUri?: string }) => {
			console.log('Received message from Melody:', data);

			// Check if the data contains text and handle it accordingly
			if (data.text) {
				// Append system message to local state as text
				addMessageToLocalState({ type: 'SYSTEM_TEXT', content: data.text });
			} else if (data.fileUri) {
				// Handle the file URI message case
				addMessageToLocalState({ type: 'SYSTEM_FILE', content: data.fileUri });
			} else {
				// Log or handle cases where neither text nor fileUri is present
				console.error('Received undefined message type from Melody');
			}

			setWaitingForMessageState(null);
			setLoading(false);
		});

		// TYPING, GENERATING_IMAGE, ...
		newSocket.on("melody_state_update", (data: { state: string }) => {
			console.log("Melody's current state: " + data.state);
			setWaitingForMessageState(data.state);
		})

		setSocket(newSocket);

		console.log("Sockets successfully setup on " + config.socketUrl);

		return () => {
			newSocket.off("connect");
			newSocket.off("disconnect");
			newSocket.off("error");
			newSocket.off("receive_melody_message");
			newSocket.close();
		};
	}, [isAuthenticated, jwtToken, backendUrl, backendPort]);

	// Send to Melody (prompt, URIs for files uploaded to Bucket)
	const sendMessage = useCallback((prompt: string, fileUris: string[]) => {

		// Skip if no connection
		if (!socket || !selectedChatId) return;

		setLoading(true);
		setError(null);

		// Create new user file messages and add to state
		if (fileUris && fileUris.length > 0) {
			for (const fileUri in fileUris) {
				const newUserFileMessage: MelodyMessage = { type: "USER_FILE", content: fileUri };
				addMessageToLocalState(newUserFileMessage);

				// Handle Supabase Message Create
			}
		}

		if (prompt && prompt !== "") {
			// Create a new user message and add it to the state
			const newUserMessage: MelodyMessage = { type: "USER_TEXT", content: prompt };
			addMessageToLocalState(newUserMessage);

			// Save the user message to the database
			dispatch(createChatMessage({ chatId: selectedChatId, message: prompt }));
		}

		// Send the message to Melody through WebSocket
		socket.emit("send_to_melody", {
			chatId: selectedChatId,
			prompt: prompt,
			fileUris: fileUris
		});
	}, [socket, selectedChatId, dispatch]);

	// Change Chat
	const changeChat = useCallback((chatId: string, modelName: ModelName) => {

		if (!socket) {
			return;
		}

		socket.emit("change_chat", chatId);
		dispatch(selectChat({ chatId, modelName })); // Handle Redux State

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

	const createNewChat = useCallback((firstPrompt: string, uploadedFiles: string[], modelName: ModelName) => {

		if (!socket) {
			return;
		}

		setLoading(true);
		setError(null);

		dispatch(createChat({ firstPrompt: firstPrompt, modelName: modelName }))
			.unwrap()	// Wait for the fetch to complete
			.then(({ newChat, newMessage }) => {

				changeChat(newChat.chat_id, newChat.model_name);

				// Send the message to Melody through WebSocket
				socket.emit("send_to_melody", {
					chatId: newChat.chat_id,
					prompt: newMessage.content
				});
			})
			.catch(err => {
				setError('Failed to create chat');
				console.error('Error fetching messages:', err);
			})
			.finally(() => {
				setLoading(false);
			});
		setLoading(false);
	}, [socket, backendUrl, backendPort, jwtToken, dispatch]);

	return (
		<ChatSocketContext.Provider
			value={{
				prompt,
				setPrompt,
				messages,
				loading,
				waitingForMessageState,
				error,
				socket,
				connect: () => socket?.connect(),  // Simplified connect
				disconnect: () => socket?.disconnect(), // Simplified disconnect
				sendMessage,
				status,
				changeChat,
				createNewChat
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