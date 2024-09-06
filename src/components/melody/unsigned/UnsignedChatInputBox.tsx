import React from "react";
import SendButton from "./SendButton";
import UnsignedFileUploadIcon from "./UnsignedFileUploadIcon";
import { useChatSocket } from "@/contexts/ChatSocketContext";

interface UnsignedChatInputBoxProps {
	onSend: (message: string) => void;
	prompt: string;
	onChange: (newPrompt: string) => void;
}

const UnsignedChatInputBox: React.FC<UnsignedChatInputBoxProps> = ({ onSend, prompt, onChange }) => {
	const { loading } = useChatSocket();

	const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	const handleSendMessage = () => {
		onSend(prompt);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className="flex flex-row w-full gap-2">
			<div className="flex flex-col w-full px-4 rounded-[10px] bg-black bg-opacity-30">
				<div className="flex flex-row w-full gap-2">
					<div className="flex flex-row w-full items-center justify-center">
						<UnsignedFileUploadIcon />
						<input
							type="text"
							placeholder="Message"
							value={prompt}
							onChange={handlePromptChange}
							onKeyDown={handleKeyDown} // Add the keydown event listener
							className="w-full h-12 px-4 py-2 rounded-lg bg-transparent ring-0 focus:outline-none"
						/>
						<img
							src="/icons/melody/suggest-prompt.png"
							className="w-6 h-6 cursor-pointer object-contain hover:scale-110 hover:rotate-90 duration-500"
							alt="Enhance your prompt"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row mt-auto gap-2">
				<SendButton onClick={handleSendMessage} />
			</div>
		</div>
	);
};

export default UnsignedChatInputBox;
