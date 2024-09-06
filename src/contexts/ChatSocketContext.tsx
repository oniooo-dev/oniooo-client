import { DaoYouMessage } from "@/lib/types";
import { RootState } from "@/store/store";
import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

type SocketStatus = "connected" | "connecting" | "disconnected" | "disconnecting" | "error";

interface IChatSocketContext {
	prompt: string;
	setPrompt: (newPrompt: string) => void;
	currentChunks: string[];
	messages: DaoYouMessage[];
	socket: Socket | null;
	loading: boolean;
	status: SocketStatus;
	connect: () => void;
	disconnect: () => void;
	sendMessage: (message: string) => void;
}

const anotherInitialMessage: string = `Hello! I'm Melody, your friendly guide to the world of algorithms! 🤖`;

export const ChatSocketContext = createContext<IChatSocketContext | undefined>(undefined);

export const useChatSocket = () => {
	const context = useContext(ChatSocketContext);

	if (!context) {
		throw new Error("useChatSocket must be used within a ChatSocketProvider");
	}

	return context;
};

export const ChatSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// ...
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	// Initial message to display when the chat is opened
	const initialMessage: DaoYouMessage = {
		type: "SYSTEM_TEXT",
		content: anotherInitialMessage,
		isComplete: true,
	};

	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<DaoYouMessage[]>([initialMessage]);
	const [currentChunks, setCurrentChunks] = useState<string[]>([]);

	const [socket, setSocket] = useState<Socket | null>(null);
	const [status, setStatus] = useState<SocketStatus>("disconnected");
	const [loading, setLoading] = useState<boolean>(false);

	const currentChunksRef = useRef<string[]>([]);

	const url = "http://localhost:8080";

	// Update the ref every time currentChunks changes
	useEffect(() => {
		currentChunksRef.current = currentChunks;
	}, [currentChunks]);

	useEffect(() => {
		const newSocket = io(url, { autoConnect: true });

		newSocket.on("connect", () => {
			setStatus("connected");
			console.log("Connected to socket!");
		});

		newSocket.on("disconnect", () => {
			setStatus("disconnected");
			console.log("Disconnected from socket!");
		});

		newSocket.on("connect_error", (error) => {
			setStatus("error");
			console.error("Connection error: ", error);
		});

		// Listen for data chunks (Melody messages)
		newSocket.on("receive_stream", (chunk) => {
			const newChunk = chunk.text as string;
			if (newChunk === "") {
				// End of stream
				setMessages((prevMessages) =>
					prevMessages.map((msg, idx, arr) => (idx === arr.length - 1 ? { ...msg, isComplete: true } : msg)),
				);
				setCurrentChunks([]);
				setLoading(false);
			} else {
				setMessages((prevMessages) => {
					const lastMessage = prevMessages[prevMessages.length - 1];
					if (lastMessage && !lastMessage.isComplete) {
						// Append to the last message if it's not complete
						return [
							...prevMessages.slice(0, -1),
							{ ...lastMessage, content: lastMessage.content + newChunk },
						];
					} else {
						// Start a new message
						return [...prevMessages, { type: "SYSTEM_TEXT", content: newChunk, isComplete: false }];
					}
				});
			}
		});

		setSocket(newSocket);

		return () => {
			newSocket.off("connect");
			newSocket.off("disconnect");
			newSocket.off("connect_error");
			newSocket.off("melody_message");
			newSocket.close();
		};
	}, [url]);

	const connect = () => {
		setStatus("connecting");
		if (socket) {
			socket.connect();
		}
	};

	const disconnect = () => {
		setStatus("disconnecting");
		if (socket) {
			socket.disconnect();
		}
	};

	const sendMessage = (message: string) => {
		setLoading(true);
		setMessages((prevMessages) => [
			...prevMessages,
			{
				type: "USER_TEXT",
				content: message,
				isComplete: true,
			},
		]);

		if (socket) {
			// Send message to the server to start the stream
			socket.emit("start_stream", message);
			console.log("Sent message:", message);
		}
	};

	return (
		<ChatSocketContext.Provider
			value={{
				prompt,
				setPrompt,
				currentChunks,
				loading,
				messages,
				socket,
				connect,
				disconnect,
				sendMessage,
				status,
			}}
		>
			{children}
		</ChatSocketContext.Provider>
	);
};
