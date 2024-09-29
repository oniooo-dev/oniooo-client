import { MelodyMessage } from "@/lib/types";
import { useAppDispatch } from "@/store/useAppDispatch";
import { createChatMessage, fetchMessagesByChatId } from "@/store/features/melody/melodyThunks";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type SocketStatus = "connected" | "connecting" | "disconnected" | "disconnecting" | "error";

interface IChatSocketContext {
	prompt: string;
	setPrompt: (newPrompt: string) => void;
	messages: MelodyMessage[];
	socket: Socket | null;
	loading: boolean;
	status: SocketStatus;
	sendMessage: (message: string) => void;
	error: string | null;
	connect: () => void; // Add connect function to the interface
	disconnect: () => void; // Add disconnect function to the interface
}

export const ChatSocketContext = createContext<IChatSocketContext | undefined>(undefined);

export const useChatSocket = () => {
	const context = useContext(ChatSocketContext);

	if (!context) {
		throw new Error("useChatSocket must be used within a ChatSocketProvider");
	}

	return context;
};

export const ChatSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const selectedChatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const selectedChatMessages = useSelector((state: RootState) => state.melody.messages);

	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<MelodyMessage[]>(selectedChatMessages);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [status, setStatus] = useState<SocketStatus>("disconnected");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const url = process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL_PROD || "https://prod-backend-url.com"
		: process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL_DEV || "http://localhost:8081";

	useEffect(() => {
		setMessages([]);
		if (selectedChatId) {
			dispatch(fetchMessagesByChatId({ chatId: selectedChatId }));
		}
	}, [selectedChatId, dispatch]);

	useEffect(() => {
		setMessages(selectedChatMessages);
	}, [selectedChatMessages]);

	useEffect(() => {
		const newSocket = io(url, { autoConnect: true, transports: ["websocket"] });

		newSocket.on("connect", () => {
			setStatus("connected");
			console.log("Connected to socket!");
		});

		newSocket.on("disconnect", () => {
			setStatus("disconnected");
			console.log("Disconnected from socket!");
		});

		newSocket.on("connect_error", (err) => {
			setStatus("error");
			setError("Connection error: " + err.message);
			console.error("Connection error: ", err);
		});

		newSocket.on("receive_stream", (data: { text: string }) => {
			const isDataFinal = !data.text || data.text === '';
			console.log("Received stream: ", isDataFinal ? "Final chunk" : data.text);

			setMessages((prevMessages) => {
				const updatedMessages = [...prevMessages];
				const lastMessage = updatedMessages[updatedMessages.length - 1];

				if (isDataFinal) {
					if (lastMessage && !lastMessage.isComplete && lastMessage.type === "SYSTEM_TEXT") {
						updatedMessages[updatedMessages.length - 1] = { ...lastMessage, isComplete: true };
						dispatch(fetchMessagesByChatId({ chatId: selectedChatId }));
					}
				} else {
					if (lastMessage && !lastMessage.isComplete && lastMessage.type === "SYSTEM_TEXT") {
						updatedMessages[updatedMessages.length - 1] = {
							...lastMessage,
							content: lastMessage.content + data.text
						};
					} else {
						updatedMessages.push({ type: "SYSTEM_TEXT", content: data.text, isComplete: false });
					}
				}

				console.log("Updated messages: ", updatedMessages);
				return updatedMessages;
			});

			if (isDataFinal) {
				setLoading(false);
			}
		});

		setSocket(newSocket);

		return () => {
			newSocket.off("connect");
			newSocket.off("disconnect");
			newSocket.off("connect_error");
			newSocket.off("receive_stream");
			newSocket.close();
		};
	}, [url]);

	const sendMessage = useCallback((message: string) => {
		if (!socket || !selectedChatId) return;

		setLoading(true);
		setError(null);

		const newUserMessage: MelodyMessage = { type: "USER_TEXT", content: message, isComplete: true };
		setMessages((prevMessages) => [...prevMessages, newUserMessage]);

		// Dispatch to DB
		dispatch(createChatMessage({ chatId: selectedChatId, message }));

		socket.emit("start_stream", { chatId: selectedChatId, prompt: message });
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
			}}
		>
			{children}
		</ChatSocketContext.Provider>
	);
};