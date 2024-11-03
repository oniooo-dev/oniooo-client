import React from "react";
import Markdown from 'react-markdown'
import ImageFile from "./files/ImageFile";

interface ConversationMessageProps {
	type: string;
	content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ type, content }) => {
	if (type.includes("TEXT")) {
		// Handle text message
		return (
			<div className="flex flex-col max-w-[80%] px-6 py-4 rounded-[10px] bg-black bg-opacity-60 border-[2px] border-opacity-20 border-pink-200 backdrop-filter backdrop-blur-sm leading-7">
				<Markdown>
					{content}
				</Markdown>
			</div>
		);
	} else if (type.includes("FILE")) {
		// Handle file message (assuming the content is a URL to the file)
		return <ImageFile imgUrl={content} />;
	}

	// Default case, should not reach here ideally
	return <p>Unsupported message type</p>;
};

export default ConversationMessage;
