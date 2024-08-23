import React from "react";
import FileUploadItem from "./FileUploadItem";

interface FileUploadListProps {
	files: File[];
	onRemove: (file: File) => void;
}

const FileUploadList: React.FC<FileUploadListProps> = ({ files, onRemove }) => {
	return (
		<div className="flex flex-row max-w-full items-center overflow-x-scroll gap-2 py-2">
			{files.map((file, index) => (
				<FileUploadItem key={index} file={file} onRemove={onRemove} />
			))}
		</div>
	);
};

export default FileUploadList;
