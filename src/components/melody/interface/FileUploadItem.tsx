import React, { useEffect, useState, useCallback, memo } from "react";

interface FileUploadItemProps {
	file: File;
	onRemove: (file: File) => void;
}

const FileUploadItem: React.FC<FileUploadItemProps> = memo(({ file, onRemove }) => {
	const [fileUrl, setFileUrl] = useState<string | null>("");

	useEffect(() => {
		const newUrl = URL.createObjectURL(file);
		setFileUrl(newUrl);

		// Cleanup function to revoke the created URL
		return () => URL.revokeObjectURL(newUrl);
	}, [file]);

	const handleRemove = useCallback(() => {
		onRemove(file);
	}, [file, onRemove]);

	const assetStyling = `absolute top-0 left-0 rounded-lg w-full h-full object-cover bg-white bg-opacity-10`;

	return (
		<div className="flex flex-row justify-center gap-2 rounded-lg cursor-pointer">
			<div
				className="relative w-24 h-32 hover:translate-y-[-10px] duration-500 transition-transform"
				onClick={handleRemove}
			>
				{file.type.includes("image") ? (
					<img src={fileUrl || ""} className={assetStyling} alt="Uploaded image" />
				) : file.type.includes("video") ? (
					<video src={fileUrl || ""} className={assetStyling} />
				) : file.type.includes("audio") ? (
					<div className="absolute top-0 left-0 flex flex-col w-full h-full gap-2 p-2 bg-red-500 bg-opacity-20 hover:bg-opacity-80 rounded-lg duration-500">
						<img
							src="/icons/files/audio.png"
						/>
						<p>{file.name}</p>
					</div>
				) : file.type.includes("pdf") ? (
					<div className="absolute top-0 left-0 flex flex-col w-full h-full gap-2 p-2 bg-red-500 bg-opacity-20 hover:bg-opacity-80 rounded-lg duration-500">
						<img
							src="/icons/files/pdf.png"
						/>
						<p className="text-xs truncate">{file.name}</p>
					</div>
				) : file.type.includes("py") ? (
					<div className="absolute top-0 left-0 flex flex-col w-full h-full justify-center items-center gap-2 p-2 bg-black bg-opacity-20 hover:bg-opacity-80 rounded-lg duration-500">
						<img
							src="https://i.pinimg.com/originals/82/a2/18/82a2188c985ce75402ae44fc43fe7e5e.png"
						/>
						<p>{file.name}</p>
					</div>
				) : (
					<>
						{/* <div className="w-8 h-8 ">
							<p>{file.type}</p>
						</div> */}
						<div className="flex flex-col justify-center items-center gap-2 p-4 bg-black bg-opacity-20 hover:bg-opacity-80 rounded-lg duration-500">
							<img
								src="https://cdn.icon-icons.com/icons2/317/PNG/512/file-text-icon_34428.png"
								className="scale-75"
							/>
							<p className="text-[#f2f2f2] text-xs text-nowrap">{file.name}</p>
							<p className="text-[#f2f2f2] text-opacity-80 text-xs text-nowrap">{file.size} KB</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
});

FileUploadItem.displayName = "FileUploadItem";

export default FileUploadItem;
