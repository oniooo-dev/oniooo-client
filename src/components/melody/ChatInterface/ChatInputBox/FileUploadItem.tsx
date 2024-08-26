import React, { useEffect, useState, useCallback, memo } from "react";

interface FileUploadItemProps {
	file: File;
	onRemove: (file: File) => void;
}

const FileUploadItem: React.FC<FileUploadItemProps> = memo(({ file, onRemove }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [fileUrl, setFileUrl] = useState<string | null>("");

	useEffect(() => {
		// Create the URL only once and store it
		if (!fileUrl) {
			const newUrl = URL.createObjectURL(file);
			setFileUrl(newUrl);
		}

		// Clean up the URL when the component unmounts or the file changes
		return () => {
			if (fileUrl) {
				URL.revokeObjectURL(fileUrl);
			}
		};
	}, [file]); // Only re-run this effect if the file changes

	const handleRemove = useCallback(() => {
		onRemove(file);
	}, [file, onRemove]);

	const assetStyling = `absolute top-0 left-0 rounded-lg w-full h-full object-cover 
						  hover:scale-[1.05] hover:translate-y-[-10px] duration-500 transition-transform`;

	return (
		<div className="flex flex-row justify-center gap-2 rounded-lg cursor-pointer">
			<div className="relative w-24 h-32 shadow-2xl" onClick={handleRemove}>
				{file.type.includes("image") ? (
					<img src={fileUrl || ""} className={assetStyling} alt="Uploaded image" />
				) : file.type.includes("video") ? (
					<video src={fileUrl || ""} className={assetStyling} />
				) : file.type.includes("pdf") ? (
					<div className="absolute top-0 left-0 flex flex-col w-full h-full gap-2 p-2 bg-red-500 rounded-lg">
						<p>PDF</p>
						<p>{file.name}</p>
						<p>{file.size}</p>
					</div>
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
});

export default FileUploadItem;
