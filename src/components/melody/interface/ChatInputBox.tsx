import React, { RefObject, useEffect, useRef } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useChatSocket } from "@/contexts/ChatSocketContext";

interface ChatInputBoxProps {
	files: File[];
	fileInputRef: RefObject<HTMLInputElement>;
	onFileDrop: (file: File[]) => void;
	onRemove: (file: File) => void;
	onReset: () => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ files, fileInputRef, onFileDrop, onRemove, onReset }) => {

	// ...
	const selectedChatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const { prompt, setPrompt, sendMessage, createNewChat, loading } = useChatSocket();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// When user uploads using the clip icon
	const handleFileDrop = (files: File[]) => {
		onFileDrop(files);
	};

	const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPrompt(event.target.value);
		adjustHeight();
	};

	const handleFileBufferReset = () => {
		onReset();

		// Resetting the input field safely
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Fetch signed URLs for the files
	async function fetchSignedUrls(files: File[]): Promise<string[]> {

		// Convert the files array to an array of objects with name and type properties
		const fileData: { name: string; type: string }[] = files.map((file) => ({
			name: file.name,
			type: file.type,
		}));

		try {

			const response = await fetch(
				"/api/getSignedUrls",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ files: fileData }),
				}
			);

			if (!response.ok) {
				console.log("Response Status:", response.status);
				const responseBody = await response.text();  // Read response as text to see what it is
				console.log("Failed Response Body:", responseBody);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// The backend returns an object with a signedUrls array
			return data.signedUrls;
		}
		catch (error) {
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

			const bucketName = 'melody-files';
			const baseUrl = `https://storage.googleapis.com/${bucketName}/`;

			const uploadPromises = files.map((file, index) => {

				const url = signedUrls[index];

				return fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": file.type,
					},
					body: file,
				}).then(response => ({
					response,
					filePath: `${baseUrl}${encodeURIComponent(file.name)}`
				}));
			});

			const responses = await Promise.all(uploadPromises);

			console.log("Upload responses:", responses);

			// Filter responses to ensure they are OK and map them to the public URLs
			return responses
				.filter(({ response }) => response.ok)
				.map(({ filePath }) => filePath);
		}
		catch (error) {
			console.error("Failed to upload files:", error);
			return [];
		}
	}

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

			/* Handle File URIs */
			const signedUrls = await fetchSignedUrls(files);
			const uploadedFiles = await uploadFiles(files, signedUrls);

			console.log(signedUrls, uploadedFiles);

			if (selectedChatId === "") {
				// Create a new chat
				createNewChat(prompt, uploadedFiles, "gemini");
			}
			else {
				// Create a USER_TEXT message with the current prompt
				sendMessage(prompt, uploadedFiles);
			}

			// Reset the prompt
			setPrompt("");

			// Clear UI
			handleFileBufferReset();
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
