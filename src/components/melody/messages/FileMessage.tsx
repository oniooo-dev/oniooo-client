
/**
 * User file message component
*/

import React from "react";

interface FileMessageProps {
	file: File;
}

const FileMessage: React.FC<FileMessageProps> = ({ file }) => {
	if (file.type.includes("image")) {
		return (
			<div className="w-full h-full">
				<img src={URL.createObjectURL(file)} alt="Uploaded image" />
			</div>
		);
	}
	// else if (file.type.includes("video")) {
	// 	return (
	// 		<div className="w-full h-full">
	// 			<video src={URL.createObjectURL(file)} />
	// 		</div>
	// 	);
	// } 
	else if (file.type.includes("pdf")) {
		return (
			<div className="w-full h-full">
				<p>PDF</p>
			</div>
		);
	}
	else {
		return (
			<div className="w-full h-full">
				<p>{file.type}</p>
			</div>
		);
	}
};

export default FileMessage;
