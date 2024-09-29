import React, { useState } from "react";
import ChatInputBox from "./ChatInputBox";
import MessageList from "./MessageList";

const ChatInterface: React.FC = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

	const handleFileBufferReset = () => {
		setFiles([]);
	};

	const removeFile = (fileToRemove: File) => {
		setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
		setIsDraggingOver(true); // Set the dragging over state to true
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(false);
		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			const newFiles = Array.from(event.dataTransfer.files);
			const updatedFiles = [...files, ...newFiles];
			setFiles(updatedFiles);
			event.dataTransfer.clearData();
		}
	};

	const handleFileDrop = (file: File) => {
		const updatedFiles = [...files, file];
		setFiles(updatedFiles);
	};

	return (
		<div
			className={`relative flex flex-col w-full h-full items-center`}
			onDragOver={handleDragOver}
		>
			{/* Drag and drop interface */}
			{isDraggingOver && (
				<div
					className="absolute top-0 left-0 flex w-full h-full items-center justify-center bg-black bg-opacity-40 z-10"
					onDragLeave={() => setIsDraggingOver(false)}
					onDragEnd={() => setIsDraggingOver(false)}
					onDrop={handleDrop}
				>
					<img
						src="https://media4.giphy.com/media/iGSaH0DyjNhPpLaXSY/200.gif?cid=6c09b952w6beaukw1x86acc0bfkayk6t42f1o0oqnpyxrtzw&ep=v1_gifs_search&rid=200.gif&ct=g"
						alt="Drag and drop"
						className="w-96 h-96"
					/>
				</div>
			)}

			{/* Message list */}
			<div className="w-[90%] lg:w-[60%] max-h-[95%] overflow-y-auto hide-scrollbar">
				<MessageList files={files} />
			</div>

			{/* Chat input box */}
			<div className="absolute bottom-4 flex w-[90%] lg:w-[70%]">
				<ChatInputBox
					files={files}
					onFileDrop={handleFileDrop}
					onRemove={removeFile}
					onReset={handleFileBufferReset}
				/>
			</div>
		</div>
	);
};

export default ChatInterface;
