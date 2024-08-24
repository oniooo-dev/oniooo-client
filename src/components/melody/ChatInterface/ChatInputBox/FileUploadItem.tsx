import React, { useEffect, useState } from "react";

interface FileUploadItemProps {
	file: File;
	onRemove: (file: File) => void;
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({ file, onRemove }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [fileUrl, setFileUrl] = useState("");

	useEffect(() => {
        const url = URL.createObjectURL(file);
        setFileUrl(url);

        return () => URL.revokeObjectURL(url); // Clean up URL when component unmounts or file changes
    }, [file]);

	const handleRemove = () => {
		onRemove(file);
	};

	const assetStyling = "absolute top-0 left-0 rounded-lg w-full h-full object-cover hover:scale-110 hover:rotate-6 hover:translate-y-[-10px] duration-500 transition-transform z-50"

	return (
		<div
			className="flex flex-row justify-center gap-2 rounded-lg cursor-pointer"
		>
			<div 
				className="relative w-24 h-32 shadow-2xl"
				onClick={handleRemove}
			>
				{
					file.type.includes("image") ? (
						<img src={URL.createObjectURL(file)} className={assetStyling} />
					) : 
					file.type.includes("video") ? (
						<video src={URL.createObjectURL(file)} className={assetStyling} />
					) : (
						<>
							<div className="w-8 h-8 ">
								<p>{file.type}</p>
							</div>
							<div className="flex flex-col justify-center">
								<p className="text-white text-xs text-nowrap">{file.name}</p>
								<p className="text-white text-opacity-80 text-xs text-nowrap">{file.size} KB</p>
							</div>
						</>
				)}
				{/* {isHovered && (
					<div
						className="absolute top-[-12px] right-[-12px] flex items-center justify-center h-6 w-6 
									rounded-full bg-red-500 bg-opacity-100 hover:bg-opacity-60 duration-500 cursor-pointer hover:rotate-90"
					>
						<img src="/icons/melody/x.png" className="w-4 h-4 filter invert" alt="Remove" onClick={handleRemove} />
					</div>
				)} */}
			</div>
		</div>
	);
};

export default FileUploadItem;
