import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import PromptBox from "../other/PromptBox";

const ChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full">
			<ChatHeader />
			<p className="text-3xl font-semibold">ChatInterface</p>
			<main className="flex flex-col w-full h-full overflow-y-scroll bg-gray-950">
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
