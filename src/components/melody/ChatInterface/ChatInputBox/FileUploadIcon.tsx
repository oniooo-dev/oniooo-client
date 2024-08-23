import React, { useRef } from "react";

interface FileUploadIconProps {
	onFileDrop: (file: File) => void;
}

const FileUploadIcon: React.FC<FileUploadIconProps> = ({ onFileDrop }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleIconClick = () => {
		fileInputRef.current?.click(); // Opens the file explorer
	};

	const handleFileDrop = (file: File) => {
		onFileDrop(file);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			console.log(file); // Process the file or handle the upload
			handleFileDrop(file);
		}
	};

	return (
		<div style={{ flexShrink: 0 }}>
			<input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} accept="image/*, video/*, audio/*, .pdf, .csv" />
			<img
				src="/icons/melody/paperclip.png"
				className="w-5 h-5 cursor-pointer object-contain"
				alt="Attach file"
				onClick={handleIconClick}
				style={{ flexShrink: 0 }}
			/>
		</div>
	);
};

export default FileUploadIcon;
