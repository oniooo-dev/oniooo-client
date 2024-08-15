import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import MessageList from "../other/MessageList";

const ChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex flex-col w-[60%] h-full">
				<ChatHeader />
				<MessageList />
				<div className="mb-[36px]">
					<ChatInputBox />
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
