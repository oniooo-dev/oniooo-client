import React, { useEffect, useRef, useState } from "react";
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
	const [currentPrompt, setCurrentPrompt] = useState<string>("");
	const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
	const [isPromptSuggestionHovered, setIsPromptSuggestionHovered] = useState<boolean>(false);
	const [isPromptSuggestionOpen, setIsPromptSuggestionOpen] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const promptSuggestionRef = useRef<HTMLDivElement>(null);
	const promptSuggestionButtonRef = useRef<HTMLDivElement>(null);

	const handlePromptSuggestionHover = () => {
		setIsPromptSuggestionHovered(true);
	};

	const handlePromptSuggestionLeave = () => {
		setIsPromptSuggestionHovered(false);
	};

	const handlePromptSuggestionClick = () => {
		setIsPromptSuggestionOpen(!isPromptSuggestionOpen);
	};

	const handlePromptSuggestionClickOutside = (event: MouseEvent) => {
		if (
			promptSuggestionRef.current &&
			!promptSuggestionRef.current.contains(event.target as Node) &&
			promptSuggestionButtonRef.current &&
			!promptSuggestionButtonRef.current.contains(event.target as Node)
		) {
			setIsPromptSuggestionOpen(false);
		}
	};

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

	useEffect(() => {
		document.addEventListener("mousedown", handlePromptSuggestionClickOutside);
		return () => {
			document.removeEventListener("mousedown", handlePromptSuggestionClickOutside);
		};
	}, []);

	return (
		<div className="flex flex-col w-full justify-center items-center" onDragOver={handleDragOver} onDrop={handleDrop}>
			<div className="w-full mb-2">{files && files.length > 0 && <FileUploadList files={files} onRemove={onRemove} />}</div>
			<div className="flex flex-row w-full gap-2">
				<div className="flex flex-col w-full pl-5 pr-3 rounded-[10px] bg-[#222222]">
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
							<div
								ref={promptSuggestionButtonRef}
								className={`mt-auto mb-[6px] hover:scale-110 hover:rotate-90 duration-500 ${isPromptSuggestionOpen && "scale-110 rotate-90"}`}
								style={{ flexShrink: 0 }}
								onMouseEnter={handlePromptSuggestionHover}
								onMouseLeave={handlePromptSuggestionLeave}
								onClick={handlePromptSuggestionClick}
							>
								{isPromptSuggestionHovered || isPromptSuggestionOpen ? (
									<img
										src="/icons/melody/suggest-prompt-full.png"
										className="w-7 h-7 cursor-pointer object-contain"
										alt="Enhance your prompt"
									/>
								) : (
									<img src="/icons/melody/suggest-prompt.png" className="w-7 h-7 cursor-pointer object-contain" alt="Enhance your prompt" />
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="mt-auto">
					<SendButton onClick={handleSend} />
				</div>
			</div>
			{/* Prompt Suggestor Div */}
			{isPromptSuggestionOpen && (
				<div
					className="absolute top-0 flex flex-row w-full h-fit p-2 gap-2 bg-white bg-opacity-20 rounded-lg -translate-y-full"
					ref={promptSuggestionRef}
				>
					<div className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg">
						<p>Prompt #1</p>
					</div>
					<div className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg">
						<p>Prompt #2</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatInputBox;
