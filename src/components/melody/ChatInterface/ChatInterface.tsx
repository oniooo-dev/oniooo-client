import React, { useState } from "react";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import MessageList from "./MessageList";

const ChatInterface = () => {
	const [files, setFiles] = useState<File[]>([]);

	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	// Ensure files are present in the event target before updating state
	// 	if (event.target.files) {
	// 		setFiles(Array.from(event.target.files));
	// 	}
	// };

	const handleFileUpload = () => {
		const formData = new FormData();

		// Append each file to the FormData object
		files.forEach((file) => {
			formData.append("files", file);
		});

		// POST request using fetch
		fetch("https://your-backend.com/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log("Success:", data))
			.catch((error) => console.error("Error:", error));
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			const newFiles = Array.from(event.dataTransfer.files); // Get the dropped files
			const updatedFiles = [...files, ...newFiles]; // Combine the new files with the existing files
			setFiles(updatedFiles); // Update the state with the combined files
			event.dataTransfer.clearData(); // Clear the drag data cache (for all formats/types)
		}
	};

	const handleFileDrop = (file: File) => {
		const updatedFiles = [...files, file]; // Combine the new file with the existing files
		setFiles(updatedFiles); // Update the state with the combined files
	};

	const removeFile = (file: File) => {
		const updatedFiles = files.filter((f) => f !== file);
		setFiles(updatedFiles);
	};

	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex flex-col w-[90%] lg:w-[65%] h-full">
				<MessageList />
				<div className="w-[100%] mb-9">
					<ChatInputBox files={files} onDragOver={handleDragOver} onDrop={handleDrop} onFileDrop={handleFileDrop} onRemove={removeFile} />
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
