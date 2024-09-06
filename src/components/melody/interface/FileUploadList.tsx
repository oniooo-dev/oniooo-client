import React from "react";
import FileUploadItem from "./FileUploadItem";

interface FileUploadListProps {
	files: File[];
	onRemove: (file: File) => void;
}

const FileUploadList: React.FC<FileUploadListProps> = ({ files, onRemove }) => {
	return (
		<div className="flex flex-row w-full gap-2 pt-8 pb-2 px-2 overflow-x-auto">
			{files.map((file, index) => (
				<FileUploadItem key={index} file={file} onRemove={onRemove} />
			))}
		</div>
	);
};

export default FileUploadList;
