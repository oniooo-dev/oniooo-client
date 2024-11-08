import React, { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import ImageFile from "./files/ImageFile";
import VideoFile from "./files/VideoFile";
import AudioFile from "./files/AudioFile";
import PDFFile from "./files/PDFFile";
import CodeFile from "./files/CodeFile";

interface ConversationMessageProps {
	type: string;
	content: string;
}

async function fetchFileType(uri: string) {
	try {
		const response = await fetch(uri);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.headers.get("content-type");
	}
	catch (error) {
		console.error('Error fetching file type:', error);
		return null;
	}
}


const ConversationMessage: React.FC<ConversationMessageProps> = ({ type, content }) => {
	const [fileType, setFileType] = useState<string | null>(null);

	useEffect(() => {
		if (type.includes("FILE")) {
			fetchFileType(content).then(setFileType).catch(() => setFileType(null));
		}
	}, [type, content]);

	if (type.includes("TEXT")) {
		// Handle text message
		return (
			<div>
				<div className="flex flex-col px-6 py-4 rounded-[20px] bg-white bg-opacity-20 leading-7">
					<Markdown>{content}</Markdown>
				</div>
			</div>
		);
	}
	else if (type.includes("FILE") && fileType) {

		// Select the file type (image, video, audio, pdf, text, ...)
		if (fileType.startsWith('image/')) {
			return <ImageFile uri={content} />
		}
		else if (fileType.startsWith('video/')) {
			return <VideoFile uri={content} />
		}
		else if (fileType.startsWith('audio/')) {
			return <AudioFile uri={content} />
		}
		else if (fileType.startsWith('application/pdf')) {
			return <PDFFile uri={content} />
		}
		else if (fileType.startsWith('text/')) {
			return <CodeFile uri={content} />
		}
		else {
			// Another file type
			return <a href={content} target="_blank" rel="noopener noreferrer">Download file</a>;
		}
	}

	// Default case, should not reach here ideally
	// return <p>Unsupported message type</p>;
};

export default ConversationMessage;
