import React from "react";
import FileUploadItem from "./FileUploadItem";

interface FileUploadListProps {
	files: File[];
	onRemove: (file: File) => void;
}

const FileUploadList: React.FC<FileUploadListProps> = ({ files, onRemove }) => {

	const handleFileRemove = (file: File) => {
		onRemove(file);
	}

	return (
		<div className="flex flex-row w-full gap-2 pt-8 pb-2 px-2 overflow-x-auto hide-scrollbar">
			{
				files.map((file, index) => (
					<FileUploadItem
						key={index}
						file={file}
						onRemove={
							file => handleFileRemove(file)
						}
					/>
				))
			}
		</div>
	);
};

export default FileUploadList;
