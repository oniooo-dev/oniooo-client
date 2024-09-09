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
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = (codeString: string) => {
		navigator.clipboard.writeText(codeString).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const customStyle = { ...okaidia };
	Object.keys(customStyle).forEach((key) => {
		if (typeof customStyle[key] === "object") {
			customStyle[key].backgroundColor = "transparent";
		}
	});

	return (
		<div className="flex flex-col max-w-full px-4 py-3 rounded-[10px] bg-black bg-opacity-40">
			{/* <ReactMarkdown
				remarkPlugins={[gfm]}
				components={{
					code({ node, inline, className, children, ...props }) {
						if (inline) {
							return (
								<code className={className} {...props}>
									{children}
								</code>
							);
						}
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							<div className="code-block">
								<SyntaxHighlighter style={customStyle} language={match[1]} PreTag="div" {...props}>
									{children}
								</SyntaxHighlighter>
								<button onClick={() => handleCopy(children.toString().trim())}>
									{copied ? "Copied" : "Copy"}
								</button>
							</div>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
				}}
			>
				{preprocessedContent}
			</ReactMarkdown> */}
			{content}
		</div>
	);
};

export default ConversationMessage;
