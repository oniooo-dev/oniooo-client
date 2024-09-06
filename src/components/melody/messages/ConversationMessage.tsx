import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ConversationMessageProps {
	content: string;
}

function preprocessMarkdown(markdownText: string) {
	// Adding a single newline before and after the bold and italic text while ensuring they're part of the content flow
	return markdownText
		.replace(/\*\*(.*?)\*\*/g, (match, p1) => `\n**${p1}**\n`)
		.replace(/\*(.*?)\*/g, (match, p1) => `\n*${p1}*\n`);
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ content }) => {
	const preprocessedContent = preprocessMarkdown(content);

	// State to show copy confirmation
	const [copied, setCopied] = useState(false);

	const handleCopy = (codeString: string) => {
		navigator.clipboard.writeText(codeString).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
		});
	};

	// Clone the okaidia theme to modify it
	const customStyle = { ...okaidia };

	// Modify the background styles within the predefined structure
	Object.keys(customStyle).forEach((key) => {
		customStyle[key] = { ...customStyle[key], backgroundColor: "transparent" };
	});

	return (
		<div className="flex flex-col max-w-full px-4 py-3 rounded-[10px] bg-black bg-opacity-40">
			<ReactMarkdown
				children={content}
				remarkPlugins={[gfm]}
				components={{
					code({ node, inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						const language = match ? match[1] : "I hate programming";
						const codeString = String(children).replace(/\n$/, "");
						return !inline && match ? (
							<div className="flex flex-col bg-white bg-opacity-5 rounded-[10px] px-2 mt-4 mb-4 text-sm font-sans">
								<div className="flex flex-row justify-between items-center w-full pl-5 pr-2 py-2 rounded-xl mt-2 bg-black bg-opacity-60">
									<p>{language}</p>
									<div
										className={`flex flex-row items-center gap-2 cursor-pointer rounded-lg px-3 py-1 
													bg-white bg-opacity-10 ${copied ? "" : "hover:bg-opacity-20"} text-xs ${copied ? "opacity-50" : ""} `}
										onClick={() => handleCopy(codeString)}
									>
										<p>{copied ? "Copied!" : "Copy"}</p>
									</div>
								</div>
								<SyntaxHighlighter style={customStyle} language={match[1]} PreTag="div" {...props}>
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							</div>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
					// Implement custom renderers for other elements as needed
				}}
			/>
		</div>
	);
};

export default ConversationMessage;
