import React, { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import ImageFile from "./files/ImageFile";
import VideoFile from "./files/VideoFile";
import AudioFile from "./files/AudioFile";
import PDFFile from "./files/PDFFile";
import CodeFile from "./files/CodeFile";

interface ConversationMessageProps {
	type: string;
	content?: string;
}

function getMimeTypeFromExtension(url: string): string {
	// Extract the portion after the last '/' to get the filename
	const filename = url.substring(url.lastIndexOf('/') + 1);

	// Extract the extension after the last dot
	const extensionMatch = filename.match(/\.([^.]+)$/);
	const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';

	// Mapping of file extensions to MIME types
	const mimeTypes: { [key: string]: string } = {
		'jpg': 'image/jpeg',
		'jpeg': 'image/jpeg',
		'png': 'image/png',
		'gif': 'image/gif',
		'bmp': 'image/bmp',
		'webp': 'image/webp',
		'mp4': 'video/mp4',
		'mp3': 'audio/mpeg',
		'pdf': 'application/pdf',
		'txt': 'text/plain',
		'js': 'application/javascript',
		'json': 'application/json',
		'css': 'text/css',
		'html': 'text/html',
		// Add more extensions and their MIME types as needed
	};

	// Return the MIME type if found, else default to 'application/octet-stream'
	return mimeTypes[extension] || 'application/octet-stream';
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ type, content }) => {

	// File info
	const [fileInfo, setFileInfo] = useState<{ fileType: string | null, signedUrl: string | null }>({ fileType: null, signedUrl: null });

	useEffect(() => {
		async function fetchFileInfo(uri: string) {
			if (!uri || typeof uri !== 'string') {
				console.error('Invalid URI:', uri);
				setFileInfo({ fileType: null, signedUrl: null });
				return;
			}

			try {
				console.log("Fetching file info for URI: " + uri);

				// For USER_FILE, fetch from API
				if (type === "USER_FILE") {
					const response = await fetch('/api/file-info', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ fileUri: uri })
					});

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const data = await response.json();
					console.log("User File info: " + JSON.stringify(data));

					setFileInfo({ fileType: data.fileType, signedUrl: data.signedUrl });
				}
				// For SYSTEM_FILE, fetch MIME type directly
				else if (type === "SYSTEM_FILE") {
					const mimeType = getMimeTypeFromExtension(uri);
					setFileInfo({ fileType: mimeType, signedUrl: uri });
				}
			}
			catch (error) {
				console.error('Error fetching file info:', error);
				setFileInfo({ fileType: null, signedUrl: null });
			}
		}

		if ((type === "USER_FILE" || type === "SYSTEM_FILE") && content) {
			fetchFileInfo(content);
		} else if (type === "USER_FILE" || type === "SYSTEM_FILE") {
			console.warn(`Skipped fetching file info. Type: ${type}, Content: ${content}`);
		}
	}, [type, content]);

	if ((type === "USER_FILE" || type === "SYSTEM_FILE") && !content) {
		return <p>Error: Content is missing.</p>;
	}

	if (type.includes("TEXT")) {
		return (
			<div className="flex flex-col px-6 py-4 rounded-[20px] bg-white bg-opacity-20 leading-7">
				<Markdown>{content}</Markdown>
			</div>
		);
	}
	else if (type.includes("FILE") && fileInfo.fileType) {
		const { fileType, signedUrl } = fileInfo;
		if (!signedUrl) return null;

		if (fileType.startsWith('image/')) {
			return <ImageFile uri={signedUrl} />
		}
		else if (fileType.startsWith('video/')) {
			return <VideoFile uri={signedUrl} />
		}
		else if (fileType.startsWith('audio/')) {
			return <AudioFile uri={signedUrl} />
		}
		else if (fileType.startsWith('application/pdf')) {
			return <PDFFile uri={signedUrl} />
		}
		else if (fileType.startsWith('text/')) {
			return <CodeFile uri={signedUrl} />
		}
		else {
			return <a href={signedUrl} target="_blank" rel="noopener noreferrer">Download file</a>;
		}
	}

	// Add Loader UI
	return <p>Loading...</p>;
};

ConversationMessage.defaultProps = {
	content: '',
};

export default ConversationMessage;