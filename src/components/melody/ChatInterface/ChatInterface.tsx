import React from "react";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import MessageList from "../other/MessageList";

const ChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex flex-col w-[60%] h-full">
				<MessageList />
				<div className="w-[100%] mb-9">
					<ChatInputBox />
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
