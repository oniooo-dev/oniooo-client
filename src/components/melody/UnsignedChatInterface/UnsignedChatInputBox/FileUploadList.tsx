import React from "react";
import FileUploadItem from "./FileUploadItem";

const FileUploadList = () => {
	return (
		<div className="flex flex-row max-w-full items-center overflow-x-scroll gap-2 py-2">
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
			<FileUploadItem />
		</div>
	);
};

export default FileUploadList;
