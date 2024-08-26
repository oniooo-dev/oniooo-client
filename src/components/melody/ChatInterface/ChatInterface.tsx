import React, { useState } from "react";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import MessageList from "./MessageList";

const ChatInterface = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = event.target.files ? Array.from(event.target.files) : [];
		const nonDuplicateFiles = newFiles.filter((file) => !uploadedFiles.includes(file.name)); // Filter out already uploaded files
		setFiles([...files, ...nonDuplicateFiles]);
	};

	const removeFile = (file: File) => {
		setFiles(files.filter((f) => f !== file));
	};

	const handleFileUpload = () => {
		const formData = new FormData();

		// Append non-uploaded files to the FormData object
		files.forEach((file) => {
			if (!uploadedFiles.includes(file.name)) {
				formData.append("files", file);
			}
		});

		// POST request using fetch
		fetch("https://your-backend.com/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				const newUploadedFiles = files.map((file) => file.name);
				setUploadedFiles([...uploadedFiles, ...newUploadedFiles]); // Update the uploaded files list
			})
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

	return (
		<div className="relative flex flex-col w-full h-full items-center">
			<div className="w-[90%] lg:w-[60%] h-full">
				<MessageList files={files} />
			</div>
			<div className="absolute bottom-0 flex w-[90%] lg:w-[60%] mb-8">
				<ChatInputBox files={files} onDragOver={handleDragOver} onDrop={handleDrop} onFileDrop={handleFileDrop} onRemove={removeFile} />
			</div>
		</div>
	);
};

export default ChatInterface;
