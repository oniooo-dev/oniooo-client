import React, { useEffect } from "react";
import UnsignedChatInputBox from "./UnsignedChatInputBox";
import UnsignedMessageList from "./UnsignedMessageList";
import { useChatSocket } from "@/contexts/ChatSocketContext";

const UnsignedChatInterface = () => {
	const { prompt, setPrompt, messages, connect, disconnect, sendMessage } = useChatSocket();

	const handlePromptChange = (newPrompt: string) => {
		setPrompt(newPrompt);
	};

	const handleSendMessage = (message: string) => {
		sendMessage(message);
		setPrompt("");
	};

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, []);

	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex flex-col w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-full">
				<UnsignedMessageList messages={messages} />
				<div className="w-[100%] mb-9">
					<UnsignedChatInputBox onSend={handleSendMessage} prompt={prompt} onChange={handlePromptChange} />
				</div>
			</div>
		</div>
	);
};

export default UnsignedChatInterface;
