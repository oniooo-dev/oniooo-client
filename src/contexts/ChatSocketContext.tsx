
/*
 * Handles the WebSocket connection and message handling for the chat.
*/

import config from "@/config";
import { MelodyChat, MelodyMessage, MelodyState } from "@/lib/types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

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
	chats: MelodyChat[];
	sendMessage: (message: string, fileUris: string[]) => void;
	selectedChatId: string | null;
	selectChat: (chatId: string | null) => void;
	fetchMessagesByChatId: (chatId: string) => Promise<void>;
	fetchChats: () => Promise<void>;
	melodyState: MelodyState | null;
	error: string | null;
	connect: () => void;
	disconnect: () => void;
}

export const ChatSocketContext = createContext<IChatSocketContext | undefined>(undefined);

export const ChatSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	// Auth
	const { isAuthenticated, jwtToken } = useAuth();

	// State
	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<MelodyMessage[]>([]);
	const [chats, setChats] = useState<MelodyChat[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [status, setStatus] = useState<SocketStatus>("disconnected");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [lastChunkId, setLastChunkId] = useState<string | null>(null);
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
	const [melodyState, setMelodyState] = useState<MelodyState | null>(null);

	const addMessageToLocalState = (newMessage: MelodyMessage) => {
		setMessages((prevMessages) => {
			return [...prevMessages, newMessage]
		});
	};

	// Function to append a new chunk to the latest message or start a new one
	const appendChunkToMessage =
		useCallback(
			(chunk: string) => {
				setMessages(prevMessages => {

					// Check if the last message can be appended to
					if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].type === 'SYSTEM_TEXT') {
						// Create a new array with all but the last message
						const newMessages = prevMessages.slice(0, -1);

						// Create a new last message object with the appended content
						const lastMessage = {
							...prevMessages[prevMessages.length - 1],
							content: prevMessages[prevMessages.length - 1].content + chunk
						};

						// Return the new array with the modified last message
						return [...newMessages, lastMessage];
					}
					else {
						// Start a new message if no suitable last message exists
						return [...prevMessages, { type: 'SYSTEM_TEXT', content: chunk }];
					}
				});
			}, []);

	const selectChat = (chatId: string | null) => {
		setSelectedChatId(chatId);
	}

	const fetchMessagesByChatId = async (chatId: string): Promise<void> => {
		try {

			// Fetch messages from backend
			const response = await fetch(`${config.backendUrl}/melody/chats/${chatId}/messages`, {
				headers: {
					'Authorization': `Bearer ${jwtToken}`
				}
			});

			// Parse response
			const { messages }: { messages: MelodyMessage[] } = await response.json();

			// Return messages
			setMessages(messages || []);
		}
		catch (error) {
			console.error('Error fetching messages:', error);
			setError('Failed to fetch messages');
		}
	}

	const fetchChats = async (): Promise<void> => {

		// Fetch chats from backend
		const response = await fetch(
			`${config.backendUrl}/melody/chats`, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`
			}
		});

		// Parse response
		const { chats }: { chats: MelodyChat[] } = await response.json();

		// Return chats
		setChats(chats || []);
	}

	// Fetch messages on chat id change
	useEffect(() => {
		if (selectedChatId) {
			fetchMessagesByChatId(selectedChatId);
		} else {
			setMessages([]);
		}
	}, [selectedChatId]);

	// Log the state of loading
	useEffect(() => {
		console.log("loading: " + loading);
	}, [loading])

	// Websockets
	useEffect(() => {

		// Doesn't need to connect if not authenticated
		if (!isAuthenticated || !jwtToken) return undefined;

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
		newSocket.on(
			"llm_response",
			(data: { text?: string; fileUri?: string, chunkId: string }) => {

				if (data.text) {

					// Log the chunk
					console.log(`Received chunk ${data.chunkId}: `, data.text);

					// Append chunk if it's not a duplicate
					if (data.chunkId !== lastChunkId) {
						appendChunkToMessage(data.text);
						setLastChunkId(data.chunkId);
					}
					else {
						console.log('Duplicate chunk detected and ignored:', data.chunkId);
					}
				}
				else if (data.fileUri) {
					console.log('Received file URI:', data.fileUri);
					addMessageToLocalState(
						{
							type: 'SYSTEM_FILE',
							content: data.fileUri
						}
					);
				}

				setLoading(false);
			}
		);

		/**
		 * Merge image and video responses
		*/

		newSocket.on("image_response", (data: { imageUrl: string }) => {
			console.log('Received image URI:', data.imageUrl);
			addMessageToLocalState(
				{
					type: 'SYSTEM_FILE',
					content: data.imageUrl
				}
			);
		});

		newSocket.on('video_response', (data: { videoUrl: string }) => {
			console.log('Received video URI:', data.videoUrl);
			addMessageToLocalState(
				{
					type: 'SYSTEM_FILE',
					content: data.videoUrl
				}
			);
		});

		newSocket.on("melody_state_update", (data: { melodyState: MelodyState }) => {

			// Log the state
			console.log("Melody state updated:", data.melodyState);

			// Update the state
			setMelodyState(data.melodyState);
		});

		// Not Sure if this is needed
		newSocket.on('llm_response_end', () => {
			console.log('Complete message received');
			setLoading(false);
		});

		// Listen for new chat creation
		newSocket.on(
			'new_chat_created',
			({ chatId }: { chatId: string }) => {
				console.log('New chat created with ID:', chatId);
				setSelectedChatId(chatId);
				fetchMessagesByChatId(chatId);
				fetchChats();
			}
		);

		setSocket(newSocket);

		console.log("Sockets successfully setup on " + config.socketUrl);

		return () => {
			newSocket.off("connect");
			newSocket.off("disconnect");
			newSocket.off("error");
			newSocket.off("llm_response");
			newSocket.off("llm_response_end");
			newSocket.off('new_chat_created');
			newSocket.off("melody_state_update");
			newSocket.close();
		};
	}, [isAuthenticated, jwtToken]);

	// Send to Melody (prompt, URIs for files uploaded to Bucket)
	const sendMessage = useCallback((prompt: string, fileUris: string[]) => {

		// Skip if no connection
		if (!socket) {
			return;
		}

		// Set loading
		setLoading(true);
		setError(null);

		// Create new user file messages and add to state
		if (fileUris && fileUris.length > 0) {

			// Loop through file URIs
			for (const fileUri of fileUris) {

				// Create a new user file message
				const newUserFileMessage: MelodyMessage = {
					type: "USER_FILE",
					content: fileUri
				};

				// Add the new user file message to the state
				addMessageToLocalState(newUserFileMessage);
			}
		}

		if (prompt && prompt !== "") {

			// Create a new user message and add it to the state
			const newUserMessage: MelodyMessage = {
				type: "USER_TEXT",
				content: prompt
			};

			// Add the new user message to the state
			addMessageToLocalState(newUserMessage);
		}

		console.log("Chat ID: " + selectedChatId + " Sending message to Melody: " + prompt);

		// Send the message to Melody through WebSocket
		socket.emit(
			"query_llm",
			{
				chatId: selectedChatId,
				userTextQuery: prompt,
				fileURIs: fileUris
			}
		);
	}, [socket, selectedChatId]);

	return (
		<ChatSocketContext.Provider
			value={{
				prompt,
				setPrompt,
				messages,
				loading,
				error,
				chats,
				melodyState,
				socket,
				selectedChatId,
				selectChat,
				fetchMessagesByChatId,
				fetchChats,
				connect: () => socket?.connect(),  // Simplified connect
				disconnect: () => socket?.disconnect(), // Simplified disconnect
				sendMessage,
				status,
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