import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import PromptBox from "../other/PromptBox";

const ChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full">
			<ChatHeader />
			<main className="flex flex-col w-full h-full overflow-y-scroll gap-2 bg-gray-950 hide-scrollbar">
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
				<PromptBox />
			</main>
			<ChatInputBox />
		</div>
	);
};

export default ChatInterface;
