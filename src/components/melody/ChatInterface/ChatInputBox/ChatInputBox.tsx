import React, { useEffect, useRef, useState } from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";

const ChatInputBox = () => {
	const [inputValue, setInputValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [currentPrompt, setCurrentPrompt] = useState("");

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

        // Reset the height to ensure we can calculate the natural content height
        textarea.style.height = 'auto';

        // Determine if the content is a single line by checking the absence of line breaks
        const isSingleLine = !textarea.value.includes('\n');

        if (isSingleLine) {
            // Apply a fixed height for single line of text
            textarea.style.height = '24px'; // Example: single line height
        } else {
            // Adjust height based on the content
            textarea.style.height = `${Math.max(textarea.scrollHeight, 50)}px`; // Minimum height for multi-line content
        }
    };

    // Adjust height on component mount and input changes
    useEffect(() => {
        adjustHeight();
    }, []);

	// const handleDragOver = (e) => {
	//     e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
	//     e.stopPropagation();
	//     e.dataTransfer.dropEffect = 'copy'; // Show drag-and-drop effect
	// };

	// const handleDrop = (e) => {
	//     e.preventDefault();
	//     e.stopPropagation();

	//     const files = e.dataTransfer.files;
	//     if (files.length) {
	//         const fileNames = Array.from(files).map(file => file.name).join(', ');
	//         setInputValue(fileNames);
	//     }
	// };

	return (
		<div
			className="flex flex-row w-full gap-2"
			// onDragOver={handleDragOver}
			// onDrop={handleDrop}
		>
			<div className="flex flex-col w-full px-4 rounded-[10px] bg-white bg-opacity-10">
				{/* <div className="pt-2">
					<FileUploadList />
				</div>
				<div className="line"></div> */}
				<div className="flex flex-row w-full gap-2 py-1">
					<div className="flex flex-row w-full gap-2">
						<div className="mt-auto mb-[12px]">
							<FileUploadIcon />
						</div>
						<textarea
							className="w-full px-1 py-2 rounded-lg bg-transparent ring-0 focus:outline-none resize-none"
							ref={textareaRef}
							placeholder="Message"
							value={currentPrompt}
							onChange={handlePromptChange}
							onKeyDown={handleKeyDown}
							maxLength={4096}
						/>
						<div className="mt-auto mb-[12px]">
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
