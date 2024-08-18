"use client";

import React, { useRef } from "react";

const FileUploadIcon = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleIconClick = () => {
		fileInputRef.current?.click(); // Opens the file explorer
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			console.log(file); // Process the file or handle the upload
		}
	};

	return (
		<div>
			<input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
			<img
				src="/icons/melody/paperclip.png"
				className="w-4 h-4 cursor-pointer hover:"
				alt="Attach file"
				onClick={handleIconClick}
			/>
		</div>
	);
};

export default FileUploadIcon;
