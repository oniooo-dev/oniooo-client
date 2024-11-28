import React, { RefObject, useEffect, useRef } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";
import { useChatSocket } from "@/contexts/ChatSocketContext";
import { uploadFiles } from "@/lib/files";

interface ChatInputBoxProps {
	files: File[];
	fileInputRef: RefObject<HTMLInputElement>;
	onFileDrop: (file: File[]) => void;
	onRemove: (file: File) => void;
	onReset: () => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ files, fileInputRef, onFileDrop, onRemove, onReset }) => {

	// Chat Socket Context
	const { prompt, setPrompt, sendMessage, loading, selectedChatId } = useChatSocket();

	// Textarea Ref
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// When user uploads using the clip icon
	const handleFileDrop = (files: File[]) => {
		onFileDrop(files);
	};

	// Handle prompt change
	const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPrompt(event.target.value);
		adjustHeight();
	};

	// Reset the file buffer
	const handleFileBufferReset = () => {
		onReset();

		// Resetting the input field safely
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleUpload = async (files: File[]) => {
		const urls = await uploadFiles(files);
		return urls;
	};

	const handleSendMessage = async () => {

		// Prevent sending messages while loading
		if (loading) {
			console.log("Cannot send message while loading");
			return;
		}

		// Prevent sending empty messages
		if (prompt === "" && files.length === 0) {
			console.log("Cannot send empty message");
			return;
		}

		try {

			// Upload files to S3
			const uploadedFileUrls = await handleUpload(files);

			console.log("UPLOADED: " + uploadedFileUrls);

			// Create a USER_TEXT message with the current prompt
			sendMessage(prompt, uploadedFileUrls);

			// Reset the prompt
			setPrompt("");

			// Clear UI
			handleFileBufferReset();

			// Adjust the height of the textarea
			adjustHeight();

		}
		catch (error) {
			console.log("Error uploading files:", error);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSendMessage();
		}
	};

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
		const minHeight = lineHeight; // Single line height
		const maxHeight = lineHeight * 5; // 5 lines maximum, adjust as needed

		// Reset height to min-height to accurately calculate scrollHeight
		textarea.style.height = `${minHeight}px`;

		const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
		textarea.style.height = `${newHeight}px`;

		// Add scrollbar if content exceeds maxHeight
		textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
	};

	// Initial height adjustment for the textarea
	useEffect(() => {
		adjustHeight();
	}, []);

	// Reset the prompt and file buffer
	useEffect(() => {
		setPrompt("");
		handleFileBufferReset();
	}, [selectedChatId]);

	return (
		<div className="flex flex-col w-full justify-center items-center">
			<div className="w-full mb-4">
				{
					files && files.length > 0 && <FileUploadList files={files} onRemove={onRemove} />
				}
			</div>
			{/* Yes, all those divs are necessary. */}
			<div className="flex flex-row w-full gap-[10px]">
				<div className="flex flex-col w-full pl-6 pr-4 rounded-[32px] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
					<div className="flex flex-row w-full gap-2 py-3">
						<div className="flex flex-row items-center w-full gap-2">
							{/* File Upload Icon */}
							<div className="mt-auto mb-[8px]">
								<FileUploadIcon fileInputRef={fileInputRef} onFileDrop={handleFileDrop} />
							</div>
							<textarea
								ref={textareaRef}
								className="w-full px-1 py-2 rounded-lg bg-transparent ring-0 focus:outline-none resize-none overflow-hidden placeholder-gray-300"
								style={{
									minHeight: 'calc(1em + 16px)', // Adjust based on your font size and padding
									lineHeight: '1.5', // Adjust as needed
								}}
								placeholder="Talk with Melody"
								value={prompt}
								onChange={handlePromptChange}
								onKeyDown={handleKeyDown}
								maxLength={4096}
								onFocus={(e) => e.target.placeholder = ""}
								onBlur={(e) => e.target.placeholder = "Talk with Melody"}
							/>
						</div>
					</div>
				</div>
				<div className={`mt-auto ${loading || (prompt === "" && files.length === 0) ? "opacity-30" : "hover:opacity-60"} rounded-xl duration-500`}>
					<SendButton onClick={handleSendMessage} />
				</div>
			</div>
		</div>
	);
};

export default ChatInputBox;
