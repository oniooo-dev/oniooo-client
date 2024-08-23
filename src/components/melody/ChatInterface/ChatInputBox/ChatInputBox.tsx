import React, { useRef, useState } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";

interface ChatInputBoxProps {
	files: File[];
	onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
	onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
	onFileDrop: (file: File) => void;
	onRemove: (file: File) => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ files, onDragOver, onDrop, onFileDrop, onRemove }) => {
	const [currentPrompt, setCurrentPrompt] = useState("");
	const [isDraggingOver, setIsDraggingOver] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
		onDragOver(event);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			onDrop(event);
		}
	};

	const handleFileDrop = (file: File) => {
		onFileDrop(file);
	};

	const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentPrompt(event.target.value);
		adjustHeight();
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

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const singleLineHeight = 24; // Height for one line of text
		const defaultHeight = 60; // Minimum height when more text is added
		const maxHeight = 500; // Maximum height when more text is added

		// Reset the height to default to accurately read scrollHeight
		textarea.style.height = "auto";
		const currentScrollHeight = textarea.scrollHeight;

		if (currentScrollHeight <= singleLineHeight) {
			textarea.style.height = `${singleLineHeight}px`; // Set height for single line
		} else {
			textarea.style.height = `${Math.min(currentScrollHeight, maxHeight)}px`; // Adjust height based on content
		}
	};

	return (
		<div className="flex flex-row w-full gap-2" onDragOver={handleDragOver} onDrop={handleDrop}>
			<div className="flex flex-col w-full px-4 rounded-[10px] bg-white bg-opacity-10">
				{files && files.length > 0 && (
					<div className="flex flex-col">
						<div className="pt-2">
							<FileUploadList files={files} onRemove={onRemove} />
						</div>
						{/* <div className="line"></div> */}
					</div>
				)}
				<div className="flex flex-row w-full gap-2 py-1">
					<div className={`flex flex-row w-full ${currentPrompt.split("\n").length > 1 ? "" : "h-10"} gap-2`}>
						<div className="mt-auto mb-[10px]">
							<FileUploadIcon onFileDrop={handleFileDrop} />
						</div>
						<textarea
							ref={textareaRef}
							className="w-full px-1 py-2 rounded-lg bg-transparent ring-0 focus:outline-none resize-none"
							placeholder="Message"
							value={currentPrompt}
							onChange={handlePromptChange}
							onKeyDown={handleKeyDown}
							maxLength={4096}
						/>
						<div className="mt-auto mb-[10px]" style={{ flexShrink: 0 }}>
							<img src="/icons/melody/magic-card.png" className="w-5 h-5 cursor-pointer object-contain" alt="Enhance your prompt" />
						</div>
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
