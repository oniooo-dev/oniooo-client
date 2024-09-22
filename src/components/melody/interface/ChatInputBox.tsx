import React, { useEffect, useRef, useState } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import { createChat, createChatMessage } from "@/store/features/melody/melodyThunks";
import { ChatState } from "@/lib/enums";
import { PROMPT_BANNER_ITEMS } from "@/lib/constants";

interface ChatInputBoxProps {
	files: File[];
	onFileDrop: (file: File) => void;
	onRemove: (file: File) => void;
	onReset: () => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ files, onFileDrop, onRemove, onReset }) => {
	// ...
	const dispatch = useAppDispatch();
	const chatState = useSelector((state: RootState) => state.melody.chatState);
	const selectedChatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const loading = useSelector((state: RootState) => state.melody.loading);

	// ...
	const [currentPrompt, setCurrentPrompt] = useState<string>("");
	const [isPromptImproveHovered, setIsPromptImproveHovered] = useState<boolean>(false);
	const [isPromptImproveOpen, setIsPromptImproveOpen] = useState<boolean>(false);
	const [showPromptBanner, setShowPromptBanner] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const promptImproveRef = useRef<HTMLDivElement>(null);
	const promptImproveButtonRef = useRef<HTMLDivElement>(null);

	const handleClose = () => {
		setShowPromptBanner(false);
	};

	const handlePromptImproveHover = () => {
		setIsPromptImproveHovered(true);
	};

	const handlePromptImproveLeave = () => {
		setIsPromptImproveHovered(false);
	};

	const handlePromptImproveClick = () => {
		if (chatState === ChatState.NEW_CHAT) {
			if (isPromptImproveOpen) {
				setShowPromptBanner(true);
			} else {
				setShowPromptBanner(false);
			}
		}
		setIsPromptImproveOpen((prevOpen) => !prevOpen);
	};

	const handlePromptImprove = () => {
		console.log("Prompt improved");
	};

	const handlePromptImproveClickOutside = (event: MouseEvent) => {
		if (
			promptImproveRef.current &&
			!promptImproveRef.current.contains(event.target as Node) &&
			promptImproveButtonRef.current &&
			!promptImproveButtonRef.current.contains(event.target as Node)
		) {
			if (chatState === ChatState.NEW_CHAT) {
				setShowPromptBanner(true);
			}
			setIsPromptImproveOpen(false);
		}
	};

	// When user uploads using the clip icon
	const handleFileDrop = (file: File) => {
		onFileDrop(file);
	};

	const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentPrompt(event.target.value);
		adjustHeight();
	};

	const handleFileBufferReset = () => {
		onReset();
	};

	// Fetch signed URLs for the files
	async function fetchSignedUrls(files: File[]): Promise<string[]> {
		// Convert the files array to an array of objects with name and type properties
		const fileData: { name: string; type: string }[] = files.map((file) => ({
			name: file.name,
			type: file.type,
		}));

		try {
			const serializedFiles = JSON.stringify({ files: fileData });

			const response = await fetch("http://localhost:3000/api/getSignedUrls", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: serializedFiles,
			});

			if (!response.ok) {
				throw new Error("Failed to fetch signed URLs");
			}

			const data = await response.json();

			// The backend returns an object with a signedUrls array
			return data.signedUrls;
		} catch (error) {
			console.error("Failed to fetch signed URLs:", error);
			return [];
		}
	}

	// Upload files to the signed URLs
	async function uploadFiles(files: File[], signedUrls: string[]): Promise<string[]> {
		if (!signedUrls || signedUrls.length === 0) {
			console.error("Invalid or empty signed URLs array");
			return [];
		}
		try {
			const uploadPromises = files.map((file, index) => {
				const url = signedUrls[index];
				return fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": file.type,
					},
					body: file,
				});
			});
			const responses = await Promise.all(uploadPromises);
			console.log("Upload responses:", responses);
			return responses
				.map((response, index) => (response.ok ? signedUrls[index] : null))
				.filter((url) => url !== null);
		} catch (error) {
			console.error("Failed to upload files:", error);
			return [];
		}
	}

	const handleSendMessage = async () => {
		if (loading || (currentPrompt === "" && files.length === 0)) {
			console.log("Cannot send empty message");
			return;
		}
		// Get Signed URLs for the files
		// Get the current prompt
		// Send the prompt and signed URLs to the backend
		try {
			// const signedUrls = await fetchSignedUrls(files);
			// const uploadedFiles = await uploadFiles(files, signedUrls);

			// const newTextMessage: MelodyMessage = {
			// 	chat_id: selectedChatId,
			// 	type: "USER_TEXT",
			// 	content: currentPrompt,
			// };

			if (chatState === ChatState.NEW_CHAT) {
				// Create a new chat
				dispatch(createChat({ firstPrompt: currentPrompt }));
			} else {
				// Send the message to the backend
				dispatch(createChatMessage({ chatId: selectedChatId, message: currentPrompt }));
			}

			// Clear UI
			setCurrentPrompt("");
			// handleFileBufferReset();
		} catch (error) {
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

	// Add event listener for clicking outside of the prompt improve div
	useEffect(() => {
		document.addEventListener("mousedown", handlePromptImproveClickOutside);
		return () => {
			document.removeEventListener("mousedown", handlePromptImproveClickOutside);
		};
	}, []);

	// Show the prompt banner if the chat state is NEW_CHAT
	useEffect(() => {
		if (chatState === ChatState.NEW_CHAT) {
			setShowPromptBanner(true);
		} else {
			setShowPromptBanner(false);
		}
	}, [chatState]);

	// Reset the prompt and file buffer
	useEffect(() => {
		setCurrentPrompt("");
		handleFileBufferReset();
	}, [selectedChatId]);

	return (
		<div className="flex flex-col w-full justify-center items-center">
			<div className="w-full mb-2">
				{files && files.length > 0 && <FileUploadList files={files} onRemove={onRemove} />}
			</div>
			{/* Yes, all those divs are necessary. */}
			<div className="flex flex-row w-full gap-2">
				<div className="flex flex-col w-full pl-5 pr-3 rounded-3xl bg-black bg-opacity-40">
					<div className="flex flex-row w-full gap-2 py-1">
						<div className="flex flex-row items-center w-full gap-2">
							{/* File Upload Icon */}
							<div className="mt-auto mb-[10px]">
								<FileUploadIcon onFileDrop={handleFileDrop} />
							</div>
							<textarea
								ref={textareaRef}
								className="w-full px-1 py-2 rounded-lg bg-transparent ring-0 focus:outline-none resize-none overflow-hidden"
								style={{
									minHeight: 'calc(1em + 16px)', // Adjust based on your font size and padding
									lineHeight: '1.5', // Adjust as needed
								}}
								placeholder="Message"
								value={currentPrompt}
								onChange={handlePromptChange}
								onKeyDown={handleKeyDown}
								maxLength={4096}
							/>
							<div
								ref={promptImproveButtonRef}
								className={`mt-auto mb-[6px] hover:scale-110 hover:rotate-90 duration-500 ${isPromptImproveOpen && "scale-110 rotate-90"}`}
								style={{ flexShrink: 0 }}
								onMouseEnter={handlePromptImproveHover}
								onMouseLeave={handlePromptImproveLeave}
								onClick={handlePromptImproveClick}
							>
								{isPromptImproveHovered || isPromptImproveOpen ? (
									<img
										src="/icons/melody/suggest-prompt-full.png"
										className="w-7 h-7 cursor-pointer object-contain"
										alt="Enhance your prompt"
									/>
								) : (
									<img
										src="/icons/melody/suggest-prompt.png"
										className="w-7 h-7 cursor-pointer object-contain"
										alt="Enhance your prompt"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className={`mt-auto ${loading || (currentPrompt === "" && files.length === 0) ? "opacity-50" : "hover:opacity-60 duration-500"}`}>
					<SendButton onClick={handleSendMessage} />
				</div>
			</div>
			{/* Prompt Suggestor Div */}
			{isPromptImproveOpen && (
				<div
					className="absolute top-0 flex flex-row w-full h-fit p-2 gap-2 bg-white bg-opacity-20 rounded-lg -translate-y-full"
					ref={promptImproveRef}
				>
					<div className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg" onClick={handlePromptImprove}>
						<p>Prompt #1</p>
					</div>
					<div className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg" onClick={handlePromptImprove}>
						<p>Prompt #2</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatInputBox;
