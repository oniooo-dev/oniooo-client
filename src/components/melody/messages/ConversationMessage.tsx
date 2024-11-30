import React, { useState, useEffect, ReactNode } from "react";
import ImageFile from "./files/ImageFile";
import VideoFile from "./files/VideoFile";
import PDFFile from "./files/PDFFile";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css'; // Import Okaidia theme

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

const CodeBlock: React.FC<{ children: string; className?: string }> = ({ children, className }) => {

	// State to track if the code is copied
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		Prism.highlightAll();
	}, [children]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (isCopied) {
			// Set a timeout to reset isCopied after 2 seconds
			timeout = setTimeout(() => {
				setIsCopied(false);
			}, 2000); // 2000 milliseconds = 2 seconds
		}
		// Cleanup the timeout if the component unmounts or isCopied changes
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [isCopied]);

	return (
		<pre className={`
						relative bg-gray-800 text-gray-300 p-4 rounded-lg ${className} 
						overflow-scroll max-w-full duration-500
						`}>
			<code className={`${className} font-mono text-sm`}>
				{children}
			</code>
			<button
				onClick={() => {
					navigator.clipboard.writeText(children);
					setIsCopied(true);
				}}
				className="absolute top-2 right-2 bg-gray-500 text-white px-4 py-2 text-xs rounded
						   opacity-50 hover:opacity-100 duration-500"
			>
				{isCopied ? 'Copied!' : 'Copy'}
			</button>
		</pre>
	);
};

const ConversationMessage: React.FC<ConversationMessageProps> = ({ type, content }) => {

	// File info
	const [fileInfo, setFileInfo] = useState<{ fileType: string | null, signedUrl: string | null }>({ fileType: null, signedUrl: null });

	useEffect(() => {
		async function fetchFileInfo(uri: string) {
			// if (!uri || typeof uri !== 'string') {
			// 	console.error('Invalid URI:', uri);
			// 	setFileInfo({ fileType: null, signedUrl: null });
			// 	return;
			// }

			try {
				console.log("Fetching file info for URI: " + uri);

				// Updated condition: Check for "USER_FILE" or presence of "s3" and "aws" in content
				if (type === "USER_FILE" || (content && content.includes("s3") && content.includes("aws"))) {

					// Fetch file info from server
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

		// Updated condition in the main if statement
		if ((type === "USER_FILE" || type === "SYSTEM_FILE") && content) {
			fetchFileInfo(content);
		}
		else if (type === "USER_FILE" || (content && content.includes("s3") && content.includes("aws"))) {
			console.warn(`Skipped fetching file info. Type: ${type}, Content: ${content}`);
		}
	}, [type, content]);

	if ((type === "USER_FILE" || (content && content.includes("s3") && content.includes("aws"))) && !content) {
		return <p>Error: Content is missing.</p>;
	}

	if (type.includes("TEXT")) {
		return (
			<div className="flex flex-col px-6 py-4 rounded-[20px] bg-white bg-opacity-[0.12] leading-7 max-w-full">
				<ReactMarkdown
					children={content}
					remarkPlugins={[remarkGfm]}
					components={{
						code({ node, className, children, ...props }) {
							if (typeof children === 'string') {
								return <CodeBlock className={className}>{children}</CodeBlock>;
							}
							return <code>{children}</code>;
						}
					}}
				/>
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
		else if (fileType.startsWith('application/pdf')) {
			return <PDFFile uri={signedUrl} />
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