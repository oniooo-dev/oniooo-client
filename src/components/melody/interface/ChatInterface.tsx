import React, { useState } from "react";
import ChatInputBox from "./ChatInputBox";
import MessageList from "./MessageList";
import UserCurrencyBalance from "@/components/layout/UserCurrencyBalance";
import UserProfileIcon from "@/components/layout/UserProfileIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AuthButton from "@/components/layout/AuthButton";

interface ChatInterfaceProps {
	isSideExtensionsOpen: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isSideExtensionsOpen }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	const handleFileBufferReset = () => {
		setFiles([]);
	};

	const removeFile = (file: File) => {
		setFiles(files.filter((f) => f !== file));
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
		setIsDraggingOver(true); // Set the dragging over state to true
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(false); // Set the dragging over state to false
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
		<div
			className={`relative flex flex-col w-full h-full items-center ${isSideExtensionsOpen ? "rounded-l-2xl" : ""} bg-white bg-opacity-[0.1]`}
			onDragOver={handleDragOver}
		>
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
			<div className="flex flex-row w-full justify-between pt-5 pb-4 px-6 bg-white bg-opacity-0">
				{isAuthenticated ? <UserCurrencyBalance /> : <div></div>}
				{isAuthenticated ? <UserProfileIcon /> : <AuthButton />}
			</div>
			<div className="w-[90%] lg:w-[60%] h-full">
				<MessageList files={files} />
			</div>
			<div className="absolute bottom-0 flex w-[90%] lg:w-[60%] mb-8">
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
