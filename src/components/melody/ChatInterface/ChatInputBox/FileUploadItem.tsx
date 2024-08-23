import React, { useState } from "react";

interface FileUploadItemProps {
	file: File;
	onRemove: (file: File) => void;
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({ file, onRemove }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleRemove = () => {
		onRemove(file);
	};

	return (
		<div
			className="relative flex flex-row justify-center p-2 gap-2 rounded-lg border border-opacity-20"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="w-8 h-8 ">
				{file.type.includes("image") ? <img src={URL.createObjectURL(file)} className="w-full h-full object-cover " /> : <p>{file.type}</p>}
			</div>
			<div className="flex flex-col justify-center">
				<p className="text-white text-xs text-nowrap">{file.name}</p>
				<p className="text-white text-opacity-80 text-xs text-nowrap">{file.size} KB</p>
			</div>
			{isHovered && (
				<div
					className="absolute top-[-8px] right-[-8px] flex items-center justify-center h-6 w-6 
                                rounded-full bg-white bg-opacity-20 hover:bg-opacity-10 duration-500 cursor-pointer hover:rotate-90"
				>
					<img src="/icons/melody/x.png" className="w-4 h-4 filter invert" alt="Remove" onClick={handleRemove} />
				</div>
			)}
		</div>
	);
};

export default FileUploadItem;
