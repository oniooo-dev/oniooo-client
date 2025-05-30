import React, { useEffect, useRef, useState } from "react";
import ChatInputBox from "./ChatInputBox";
import MessageList from "./MessageList";
import { useChatSocket } from "@/contexts/ChatSocketContext";

const ChatInterface: React.FC<{ openAuthModal: () => void }> = ({ openAuthModal }) => {

	// ...
	const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

	const { messages, setPrompt } = useChatSocket();

	// Maximum file size in bytes (5 MB)
	const MAX_FILE_SIZE = 20 * 1024 * 1024;

	// Files
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

	const removeFile = (fileToRemove: File) => {
		setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));

		// Resetting the input field safely
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleFileBufferReset = () => {
		setFiles([]);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(true);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(false);

		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			const newFiles = Array.from(event.dataTransfer.files).filter(file => {
				if (file.size > MAX_FILE_SIZE) {
					alert(`File ${file.name} exceeds the maximum file size of 20MB.`);
					return false;
				}
				return true;
			});
			const updatedFiles = [...files, ...newFiles];
			setFiles(updatedFiles);
			event.dataTransfer.clearData();
		}
	};

	const handleFileDrop = (newFiles: File[]) => {

		// Validate File Buffer Size
		const validFiles = newFiles.filter(file => {
			if (file.size > MAX_FILE_SIZE) {
				alert(`File ${file.name} exceeds the maximum file size of 20MB.`);
				return false;
			}
			return true;
		});

		const updatedFiles = [...files, ...validFiles];
		setFiles(updatedFiles);
	};

	// ...
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const suggestionButtons = [
		{
			icon: "/images/suggestions/dragon.png",
			title: "Create an illustration",
			description: "Of a mythic dragon",
			fullPrompt: "Create an illustration of a mythic dragon",
			uploadImage: false
		},
		{
			icon: "/images/suggestions/fam.png",
			title: "Generate a video",
			description: "of beautiful memories",
			fullPrompt: "Generate a video of beautiful memories",
			uploadImage: false
		},
		{
			icon: "/images/suggestions/girl_reading_paper.png",
			title: "Write a deep-dive article",
			description: "on AI's impact on creativity",
			fullPrompt: "Write a deep-dive article on AI's impact on creativity",
			uploadImage: false
		},
		{
			icon: "/images/suggestions/paint.png",
			title: "Remove the background",
			description: "of this image",
			fullPrompt: "Remove the background of this image",
			uploadImage: true
		}
	]

	// Scroll to the bottom of the messages list
	const scrollToBottom = () => {
		setTimeout(() => {  // Ensure scroll adjustments happen after DOM updates
			messagesContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
		}, 0);
	};

	useEffect(() => {
		console.log('Files: ' + files);
	}, [files])


	const handleSuggestionClick = async (fullPrompt: string, icon: string, uploadImage: boolean) => {
		handleFileBufferReset();

		if (uploadImage) {
			try {
				// Fetch the icon image from the local path
				const response = await fetch(icon);
				if (!response.ok) {
					throw new Error(`Failed to fetch image: ${response.statusText}`);
				}

				const blob = await response.blob();
				const fileName = icon.split('/').pop() || 'icon.png';
				const file = new File([blob], fileName, { type: blob.type });

				// Upload the file to the file buffer
				handleFileDrop([file]);
			}
			catch (error) {
				console.error('Error uploading icon:', error);
			}
		}

		setPrompt(fullPrompt);
	};

	return (
		<div
			className={`relative flex flex-col w-full h-full items-center`}
			onDragOver={handleDragOver}
		>

			{/* Drag and drop interface */}
			{
				isDraggingOver &&
				(
					<div
						className="absolute top-0 left-0 flex flex-col gap-2 w-full h-full items-center justify-center bg-black bg-opacity-40 z-10"
						onDragLeave={() => setIsDraggingOver(false)}
						onDragEnd={() => setIsDraggingOver(false)}
						onDrop={handleDrop}
					>
						<img
							src="/images/drag-and-drop.png"
							alt="Drag and drop"
							className="w-48 h-48"
						/>
						<p className="text-xl font-medium">
							Add anything
						</p>
						<p className="text-md">
							Drop any file here to add it to the conversation
						</p>
					</div>
				)
			}

			{/* Message list */}
			<div className="w-[90%] lg:w-[65%] h-[95%] overflow-y-auto hide-scrollbar">
				<MessageList
					messagesContainerRef={messagesContainerRef}
					setShowScrollButton={setShowScrollButton}
					scrollToBottom={scrollToBottom}
					files={files}
				/>
			</div>

			{
				showScrollButton &&
				(
					<button className="fixed bottom-28 px-6 py-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full z-50 duration-500" onClick={scrollToBottom}>
						<img
							src="https://cdn-icons-png.flaticon.com/512/60/60564.png"
							className="w-4 h-4 filter invert rotate-180"
							style={{ flexShrink: 0 }}
						/>
					</button>
				)
			}

			{/* Chat input box */}
			<div className="mb-4 flex-col w-[90%] lg:w-[65%]">
				{
					(messages.length === 0 && files.length === 0) &&
					(
						<div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full justify-center mb-4">
							{
								suggestionButtons.map((button, index) => (
									<div key={index} className="flex flex-row items-center gap-3 w-full bg-white bg-opacity-[0.12] hover:bg-opacity-40 p-3 rounded-[25px] cursor-pointer duration-500"
										onClick={() => {
											handleSuggestionClick(button.fullPrompt, button.icon, button.uploadImage);
										}}
									>
										<img src={button.icon} alt={button.title} className="w-14 h-14 rounded-[20px]" />
										<div className="flex flex-col items-start justify-center gap-[2px]">
											<p className="text-[14px] text-left">{button.title}</p>
											<p className="text-[14px] text-left opacity-60">{button.description}</p>
										</div>
									</div>
								))
							}
						</div>
					)
				}
				<ChatInputBox
					files={files}
					fileInputRef={fileInputRef}
					onFileDrop={handleFileDrop}
					onRemove={removeFile}
					onReset={handleFileBufferReset}
					openAuthModal={openAuthModal}
				/>
			</div>
		</div>
	);
};

export default ChatInterface;
