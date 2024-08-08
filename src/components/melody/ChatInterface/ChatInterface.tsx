import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import MessageList from "../other/MessageList";

const ChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full">
			<ChatHeader />
			<MessageList />
			<ChatInputBox />
		</div>
	);
};

export default ChatInterface;
