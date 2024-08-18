"use client";

import React, { useState } from "react";

const FileUploadItem = () => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			className="relative flex flex-row justify-center p-2 gap-2 rounded-lg border border-opacity-20"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="w-8 h-8 rounded-lg bg-red-400"></div>
			<div className="flex flex-col justify-center">
				<p className="text-white text-sm text-nowrap">File Name</p>
				<p className="text-white text-opacity-80 text-xs text-nowrap">File Size</p>
			</div>
			{isHovered && (
				<div
					className="absolute top-[-8px] right-[-8px] flex items-center justify-center h-6 w-6 
                                rounded-full bg-white bg-opacity-60 cursor-pointer"
				>
					x
				</div>
			)}
		</div>
	);
};

export default FileUploadItem;
