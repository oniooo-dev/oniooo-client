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
			<input
				type="file"
				style={{ display: "none" }}
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*, video/*, audio/*, .pdf, .doc, .docx, .xlsx, .xls, .csv, .obj, .glb, .gltf, .html, .css, .js, .ts, .py, .rs, .go"
			/>
			<img
				src="/icons/melody/paperclip.png"
				className="w-[20px] h-[20px] cursor-pointer object-contain scale-x-[-1] rotate-45 opacity-60 hover:opacity-100 duration-500"
				alt="Attach file"
				onClick={handleIconClick}
				style={{ flexShrink: 0 }}
			/>
		</div>
	);
};

export default FileUploadIcon;
