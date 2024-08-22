import React, { useState } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";
import VoiceButton from "./VoiceButton";

const ChatInputBox = () => {
	const [inputValue, setInputValue] = useState("");
	

	const [currentPrompt, setCurrentPrompt] = useState("");

	const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentPrompt(event.target.value);
	};

	const handleSend = () => {
		console.log("Send button clicked");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	};

	// const handleDragOver = (e) => {
	//     e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
	//     e.stopPropagation();
	//     e.dataTransfer.dropEffect = 'copy'; // Show drag-and-drop effect
	// };

	// const handleDrop = (e) => {
	//     e.preventDefault();
	//     e.stopPropagation();

	//     const files = e.dataTransfer.files;
	//     if (files.length) {
	//         const fileNames = Array.from(files).map(file => file.name).join(', ');
	//         setInputValue(fileNames);
	//     }
	// };

	return (
		<div
			className="flex flex-row w-full gap-2"
			// onDragOver={handleDragOver}
			// onDrop={handleDrop}
		>
			<div className="flex flex-col w-full px-4 rounded-[10px] bg-white bg-opacity-15">
				{/* <div className="pt-2">
					<FileUploadList />
				</div>
				<div className="line"></div> */}
				<div className="flex flex-row w-full gap-2">
					<div className="flex flex-row w-full items-center justify-center gap-2">
						<FileUploadIcon />
						<textarea
							placeholder="Message"
							value={currentPrompt}
							onChange={handlePromptChange}
							onKeyDown={handleKeyDown}
							className="w-full min-h-12 max-h-12 px-4 py-2 rounded-lg bg-transparent ring-0 focus:outline-none resize-none"
						/>
						<img src="/icons/melody/magic-card.png" className="w-5 h-5 cursor-pointer object-contain" alt="Enhance your prompt" />
					</div>
				</div>
			</div>
			<div className="flex flex-row mt-auto gap-2">
				<SendButton onClick={handleSend} />
			</div>
		</div>
	);
};

export default ChatInputBox;
