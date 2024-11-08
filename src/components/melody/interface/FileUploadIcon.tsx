import React, { RefObject } from "react";

interface FileUploadIconProps {
	fileInputRef: RefObject<HTMLInputElement>;
	onFileDrop: (files: File[]) => void;
}

const FileUploadIcon: React.FC<FileUploadIconProps> = ({ fileInputRef, onFileDrop }) => {

	const handleIconClick = () => {
		fileInputRef.current?.click(); // Opens the file explorer
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		event.preventDefault();

		if (!event.target.files) {
			console.log("No File Data!");
			return;
		}

		console.log("Files uploaded from button: " + event.target.files.length);
		onFileDrop(Array.from(event.target.files));
	};

	return (
		<div style={{ flexShrink: 0 }}>
			<input
				type="file"
				multiple
				style={{ display: "none" }}
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*, video/*, audio/*, .pdf, .txt, .html, .css, .js, .ts, .py, .rs, .go"
			/>
			<img
				src="/icons/melody/paperclip.png"
				className="w-[22px] h-[22px] cursor-pointer object-contain scale-x-[-1] rotate-45 duration-500"
				alt="Attach file"
				onClick={handleIconClick}
				style={{ flexShrink: 0 }}
			/>
		</div>
	);
};

export default FileUploadIcon;
